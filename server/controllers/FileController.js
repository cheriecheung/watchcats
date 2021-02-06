const Cat = require('../model/Cat')
const User = require('../model/User');

const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid').v4;
const path = require('path');

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = process.env;

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

const storageS3 = multerS3({
  s3,
  bucket: AWS_S3_BUCKET_NAME,
  key: (req, file, cb) => {
    const imageUid = uuid();
    const extension = path.extname(file.originalname);
    cb(null, `${imageUid}${extension}`);
  },
  contentType: (req, file, cb) => {
    cb(null, file.mimetype);
  },
  acl: 'public-read'
})

module.exports = {
  storageS3,

  saveTestPicture: async (req, res) => {
    try {
      const { file } = req;
      if (!file) return res.status(404).json('ERROR/ERROR_OCCURED');

      const { fieldname, key } = file || {};
      console.log({ fieldname, key });

      return res.status(200).json('TEST picture successfully saved');
    } catch (e) {
      console.log({ e });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  deleteImage: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(404).json('ERROR/USER_NOT_FOUND');

      await userRecord.updateOne({ $unset: { profilePicture: '' } });

      const { filename } = req.body;

      return res.status(200).json('Picture successfully deleted: ' + filename);
    } catch (err) {
      console.log({ err });
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  },

  saveFileName: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(404).json('ERROR/USER_NOT_FOUND');

      const { file } = req;
      if (!file) return res.status(404).json('ERROR/ERROR_OCCURED');

      const { key } = file || {};

      userRecord.profilePicture = key;
      await userRecord.save();

      return res.status(200).json('File successfully saved');
    } catch (e) {
      console.log({ e });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  saveCatPhoto: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const userObjid = ObjectId(userId)

    try {
      const { file } = req;
      const { key } = file || {};
      const { fieldArrayIndex } = req.body;
      const photo = req.file;

      console.log({ photo, fieldArrayIndex })

      const { owner } = await User.findById(userObjid)
      const ownerObjId = ObjectId(owner)

      const catRecords = await Cat.find({ owner: ownerObjId });
      catRecords[fieldArrayIndex].photo = key;

      await catRecords[fieldArrayIndex].save();

      return res.status(200).json('Cat photos saved in respective cat records');
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  deleteCatPhoto: async (req, res) => {
    try {
      const { filename } = req.body;

      const updatedRecord = await Cat.findOneAndUpdate({ photo: filename }, { $unset: { photo: '' } })
      if (!updatedRecord) return res.status(404).json('ERROR/ERROR_OCCURED');

      return res.status(200).json('Picture successfully deleted');
    } catch (err) {
      console.log({ err })
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  }
};
