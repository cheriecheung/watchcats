const mongoose = require('mongoose');
const Cat = require('../model/Cat')
const User = require('../model/User');

const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

const ObjectId = require('mongodb').ObjectID;

const conn = mongoose.createConnection(process.env.DB_CONNECT);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: process.env.DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = { filename, bucketName: 'uploads' };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = {
  storage,

  saveTestPicture: async (req, res) => {
    try {
      const { file } = req;
      if (!file) return res.status(404).json('ERROR/ERROR_OCCURED');

      const { fieldname, filename } = file || {};
      console.log({ fieldname, filename });

      return res.status(200).json('TEST picture successfully saved');
    } catch (e) {
      console.log({ e });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  displayImage: async (req, res) => {
    const image = await gfs.files.findOne({ filename: req.params.filename });
    if (!image) return res.status(404).json('ERROR/ERROR_OCCURED');

    const { contentType, filename } = image;
    if (contentType === 'image/jpeg' || contentType === 'image/png') {
      const readstream = gfs.createReadStream(filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  },

  deleteImage: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('ERROR/USER_NOT_FOUND');

    await userRecord.updateOne({ $unset: { profilePicture: '' } });

    try {
      const { filename } = req.body;
      await gfs.remove({ filename, root: 'uploads' });

      return res.status(200).json('Picture successfully deleted');
    } catch (err) {
      console.log({ err });
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  },

  saveFileName: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('ERROR/USER_NOT_FOUND');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('ERROR/USER_NOT_FOUND');

    try {
      const { file } = req;
      if (!file) return res.status(404).json('ERROR/ERROR_OCCURED');

      const { fieldname, filename } = file || {};

      console.log({ fieldname, filename });

      if (fieldname === 'profilePic') {
        userRecord.profilePicture = filename;
      }

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
      const { filename } = file || {};
      const { fieldArrayIndex } = req.body;
      const photo = req.file;

      console.log({ photo, fieldArrayIndex })

      const { owner } = await User.findById(userObjid)
      const ownerObjId = ObjectId(owner)

      const catRecords = await Cat.find({ owner: ownerObjId });
      catRecords[fieldArrayIndex].photo = filename;

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

      await gfs.remove({ filename, root: 'uploads' });
      return res.status(200).json('Picture successfully deleted');
    } catch (err) {
      console.log({ err })
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  }
};
