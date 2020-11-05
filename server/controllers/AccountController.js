const User = require('../model/User');
const { changePasswordValidation, phoneNumberValidation, personalDataValidation } = require('../helpers/validation')

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

    const { error } = personalDataValidation(req.body)
    console.log({ error })
    if (error) return res.status(401).json(error.details[0].message);

    try {
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
    try {
      return res.status(200).json('')
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  },

  verifyPhoneNumber: async (req, res) => {
    const { userId } = req.verifiedData;
    if (!userId) return res.status(404).json('No user id');

    const { code } = req.body;
    // verify code
    // if (!verified) return res.status(401).json('Wrong verification code')

    try {
      // const userRecord = await User.findOneAndUpdate(
      //   { _id: userId },
      //   { $set: { phone: 'phone value here' } },
      //   { useFindAndModify: false }
      // );
      // if (!userRecord) return res.status(401).json('Fail to update');

      return res.status(200).json(1253259348)
    } catch (err) {
      console.log({ err })
      return res.status(403).json('Unable to retrieve user contact details')
    }
  }
}