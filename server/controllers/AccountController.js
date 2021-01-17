const User = require('../model/User');
const { changePasswordValidation, phoneNumberValidation, personalDataValidation } = require('../helpers/validation')
const { sendTwilioSMS } = require('../helpers/sms')
const bcrypt = require('bcryptjs');
const { getCoordinatesByPostcode } = require('../helpers/user')

async function generateOTP(userId) {
  let otp = Math.floor(100000 + Math.random() * 900000)
  otp = parseInt(otp).toString();

  const salt = await bcrypt.genSalt(12);
  const hashedOtp = await bcrypt.hash(otp, salt);

  const currentTime = new Date();
  const expiryTime = new Date(currentTime.getTime() + (2 * 60 * 1000))

  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        otp: hashedOtp,
        otpExpiryTime: expiryTime
      }
    },
    { useFindAndModify: false }
  );

  return { otp }
}

module.exports = {
  getPersonalInfo: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

    return res.status(200).json(user);
  },

  postPersonalInfo: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const { postcode } = req.body;

    try {
      const { error } = personalDataValidation(req.body)
      if (error) return res.status(401).json('ERROR/CORRECT_INFO_NEEDED');

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { ...req.body } },
        { useFindAndModify: false }
      );
      if (!user) return res.status(401).json('ERROR/FAIL_TO_SAVE');

      if (postcode !== user.postcode) {
        const { lng, lat } = await getCoordinatesByPostcode(postcode)

        user.coordinates = [lng, lat];
        await user.save();
      }

      return res.status(200).json('Success');
    } catch (e) {
      console.log({ e });
      return res.status(401).json('ERROR/FAIL_TO_SAVE');
    }
  },

  getAccountDetails: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('ERROR/USER_NOT_FOUND');

      const {
        isVerified,
        email,
        getEmailNotification,
        phone,
        getSmsNotification,
        password,
        stripeAccountId,
        twoFactorSecret,
      } = user;

      const isDemoUser = email === process.env.DEMO_USER_EMAIL;

      const isTwoFactorEnabled = twoFactorSecret ? true : false;
      const isGoogleLogin = !password && !isVerified ? true : false;
      const hasSetUpStripAccount = stripeAccountId && stripeAccountId.includes('acct_') ? true : false;

      return res.status(200).json({
        email,
        getEmailNotification,
        phone,
        getSmsNotification,
        hasSetUpStripAccount,
        isDemoUser,
        isTwoFactorEnabled,
        isGoogleLogin
      })
    } catch (err) {
      console.log({ err })
      return res.status(403).json('ERROR/ERROR_OCCURED')
    }
  },

  changeNotification: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json(error);

    const { contactType } = req.body;

    const error = contactType === 'email' ?
      'ERROR/SET_EMAIL_NOTIFICATION_FAILED' :
      'ERROR/SET_PHONE_NOTIFICATION_FAILED'

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json(error);

      const { getEmailNotification, getSmsNotification } = user

      if (contactType === 'email') {
        user.getEmailNotification = !getEmailNotification;
      }

      if (contactType === 'sms') {
        user.getSmsNotification = !getSmsNotification;
      }

      await user.save();

      console.log({ contactType, user })

      return res.status(200).json({
        getEmailNotification: user.getEmailNotification,
        getSmsNotification: user.getSmsNotification
      })
    } catch (err) {
      console.log({ err })
      return res.status(400).json(error)
    }
  },

  submitPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const { phone } = req.body;

    try {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) return res.status(400).json('ERROR/PHONE_ALREADY_EXISTS')

      const { otp } = await generateOTP(userId);
      sendTwilioSMS(phone, 'VERIFY_PHONE_NUMBER', { code: otp })

      return res.status(200).json('success')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/PHONE_SUBMISSION_FAILED')
    }
  },

  resendOtpToInputtedPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const { phone } = req.body;

    try {
      const { otp } = await generateOTP(userId);
      sendTwilioSMS(phone, 'VERIFY_PHONE_NUMBER', { code: otp })

      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('ERROR/ERROR_OCCURED')
    }
  },

  sendOtpToSavedPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const { phone } = await User.findById(userId)
    if (!phone) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const { otp } = await generateOTP(userId);
      sendTwilioSMS(phone, 'VERIFY_PHONE_NUMBER', { code: otp })

      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  },

  verifyPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/PHONE_VERIFICATION_FAILED');

    const { code, phone } = req.body;

    try {
      const { otp, otpExpiryTime } = await User.findById(userId)
      if (!otp || !otpExpiryTime) return res.status(404).json('ERROR/OTP_INVALID');

      const validOtp = await bcrypt.compare(code, otp)
      const expired = new Date() > otpExpiryTime

      if (!validOtp) return res.status(400).json('ERROR/OTP_INVALID')
      if (expired) return res.status(400).json('ERROR/OTP_EXPIRED')

      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: { phone },
          $unset: { otp: '', otpExpiryTime: '' }
        },
        { useFindAndModify: false }
      );
      if (!user) return res.status(400).json('ERROR/PHONE_SAVING_FAILED');

      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/PHONE_VERIFICATION_FAILED')
    }
  },

  deletePhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('ERROR/PHONE_DELETION_FAILED');

    const { otp: submittedOtp } = req.query;

    try {
      const user = await User.findById(userId)
      if (!user) return res.status(401).json('ERROR/PHONE_DELETION_FAILED');

      const { otp, otpExpiryTime } = user;

      const validOtp = await bcrypt.compare(submittedOtp, otp)
      const expired = new Date() > otpExpiryTime

      if (!validOtp) return res.status(401).json('ERROR/OTP_INVALID')
      if (expired) return res.status(401).json('ERROR/OTP_EXPIRED')

      await user.updateOne({
        $unset: {
          otp: '',
          otpExpiryTime: '',
          phone: '',
          getSmsNotification: ''
        }
      });

      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('ERROR/PHONE_DELETION_FAILED')
    }
  }
}