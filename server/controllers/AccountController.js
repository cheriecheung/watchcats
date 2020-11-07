const User = require('../model/User');
const { changePasswordValidation, phoneNumberValidation, personalDataValidation } = require('../helpers/validation')
const { sendTwilioSMS } = require('../helpers/sms')

function generateOTP() {
  let otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);

  return otp
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

    try {
      const { error } = personalDataValidation(req.body)
      if (error) return res.status(401).json(error.details[0].message);

      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { ...req.body } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(401).json('Fail to update');

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
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(404).json('User not found');

      const { email, phone } = userRecord;

      console.log({ email, phone })

      return res.status(200).json({ email, phone })
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  },

  submitPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { phone } = req.body;

    try {
      const otp = generateOTP();

      req.session.phone = phone;
      req.session.otp = otp;

      // sendTwilioSMS(phone, otp)
      console.log({ phone, otp })

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
      const otp = generateOTP();
      req.session.otp = otp;

      console.log({ session__resend: req.session })

      // sendTwilioSMS(phone, otp)

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
    const { otp, phone } = req.session
    console.log({ code, session: req.session })

    try {
      if (parseInt(code) !== otp) return res.status(401).json('Invalid code')

      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { phone } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(401).json('Fail to update');

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
      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { phone: null } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(401).json('Fail to update');

      return res.status(200).json('Phone deleted')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to delete phone')
    }
  }
}