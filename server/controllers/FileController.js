const mongoose = require('mongoose');
const User = require('../model/User');

const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

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

  displayImage: async (req, res) => {
    const image = await gfs.files.findOne({ filename: req.params.filename });
    if (!image) return res.status(404).json('No image exists');

    const { contentType, filename } = image;
    if (contentType === 'image/jpeg' || contentType === 'image/png') {
      const readstream = gfs.createReadStream(filename);
      readstream.pipe(res);
    } else {
      return res.status(404).json('Not an image');
    }
  },

  deleteImage: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('User not found');

    await userRecord.update({ $unset: { profilePictureFileName: '' } });

    try {
      const { filename } = req.body;
      await gfs.remove({ filename, root: 'uploads' });

      return res.status(200).json('Picture successfully deleted');
    } catch (err) {
      console.log({ err });
      return res.status(404).json('Picture does not exist');
    }
  },

  saveFileName: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('User not found');

    try {
      const { file } = req;
      if (!file) return res.status(404).json('File is not properly uploaded');

      const { fieldname, filename } = file || {};

      console.log({ fieldname, filename });

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
