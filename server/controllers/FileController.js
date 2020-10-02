const User = require('../model/User');

module.exports = {
  saveFileName: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('User not found');

    try {
      const { file } = req;
      if (!file) return res.status(404).json('File is not properly uploaded');

      const { fieldname, filename } = file || {};

      // create unique file name

      if (fieldname === 'profilePic') {
        userRecord.profilePictureFileName = filename;
      } else {
        userRecord.addressProofFileName = filename;
      }

      await userRecord.save();
      return res.status(200).json('File successfully saved');
    } catch (e) {
      console.log({ e });
    }
  },
};
