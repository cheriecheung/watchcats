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
  const expiryTime = new Date(currentTime.getTime() + (1 * 60 * 1000))

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
    if (!userId) return res.status(403).json('User id missing');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    return res.status(200).json(user);
  },

  postPersonalInfo: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    const { postcode } = req.body;

    try {
      const { error } = personalDataValidation(req.body)
      if (error) return res.status(401).json(error.details[0].message);

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { ...req.body } },
        { useFindAndModify: false }
      );
      if (!user) return res.status(401).json('Fail to update');

      if (postcode !== user.postcode) {
        const { lng, lat } = await getCoordinatesByPostcode(postcode)

        user.coordinates = [lng, lat];
        await user.save();
      }

      return res.status(200).json('User general profile successful saved');
    } catch (e) {
      console.log({ e });
      return res.status(401).json('Unsuccessful');
    }
  },

  getContactDetails: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json('User not found');

      const { email, phone, twoFactorSecret } = user;

      const isTwoFactorEnabled = twoFactorSecret ? true : false;

      return res.status(200).json({ email, phone, isTwoFactorEnabled })
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  },

  submitPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { phone } = req.body;
    req.session.phone = phone;

    try {
      const { otp } = await generateOTP(userId);
      sendTwilioSMS(phone, 'VERIFY_PHONE_NUMBER', { code: otp })

      return res.status(200).json('Phone number submitted')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  },

  resendVerficationCode: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { phone } = req.session

    try {
      const { otp } = await generateOTP(userId);
      sendTwilioSMS(phone, 'VERIFY_PHONE_NUMBER', { code: otp })

      return res.status(200).json('Code sent')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to send code')
    }
  },

  verifyPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { code } = req.body;
    const { phone } = req.session

    try {
      const { otp, otpExpiryTime } = await User.findById(userId)
      if (!otp || !otpExpiryTime) return res.status(401).json('Code not found');

      const validOtp = await bcrypt.compare(code, otp)
      const unexpired = new Date() < otpExpiryTime

      if (!validOtp) return res.status(401).json('Invalid code')
      if (!unexpired) return res.status(401).json('Code expired, click resend')

      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: { phone },
          $unset: { otp: '', otpExpiryTime: '' }
        },
        { useFindAndModify: false }
      );
      if (!user) return res.status(401).json('Fail to update');

      return res.status(200).json('Phone verified and phone number stored')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  },

  deletePhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(401).json('Fail to update');

      await user.updateOne({ $unset: { phone: '' } });

      return res.status(200).json('Phone deleted')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to delete phone')
    }
  }
}