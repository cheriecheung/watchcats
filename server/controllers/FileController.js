const mongoose = require('mongoose');
const Cat = require('../model/Cat')
const User = require('../model/User');

const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid').v4;

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const Jimp = require('jimp');

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME, AWS_S3_UPLOAD_PATH } = process.env;

const s3 = new aws.S3({ apiVersion: '2006-03-01', accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS_KEY })

const storageS3 = multerS3({
  s3,
  bucket: AWS_S3_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname })
  },
  key: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${uuid}${extension}`);
  }
})

// ------------------------------------------------------- 

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
  storageS3,

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

    // let info = req.body;

    try {
      const { file: imageFile } = req;
      if (!imageFile) return res.status(404).json('ERROR/ERROR_OCCURED');

      const file = await Jimp.read(Buffer.from(imageFile.buffer, 'base64'))
        .then(async image => {
          image.write('lena-small-bw.jpg');

          return image.getBufferAsync(Jimp.AUTO);
        })
        .catch(err => {
          console.log({ err })
          return res.status(400).json({ msg: 'Server Error', error: err });
        });

      const s3FileURL = 'haahhaha.com'

      let s3bucket = new aws.S3({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'eu-north-1'
      });

      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: imageFile.originalname,
        Body: file,
        ContentType: imageFile.mimetype,
        ACL: 'public-read'
      };

      s3bucket.upload(params, async (err, data) => {
        try {
          if (err) {
            res.status(500).json({ error: true, Message: err });
          } else {
            const newFileUploaded = {
              description: 'nothing',
              fileLink: s3FileURL + imageFile.originalname,
              s3_key: params.Key
            };
            // info = { ...info, photo: newFileUploaded.fileLink };
            // Add all info to database after store picture to S3
            // const photos = await database.addPhoto(db, info);
            // res.send(photos);
            return res.status(200).json('File successfully saved');
          }
        } catch (err) {
          console.log({ err })
          return res.status(400).json({ msg: 'Server Error', error: err });
        }
      })
      // return res.status(200).json('File successfully saved');
    } catch (e) {
      console.log({ e });
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }

    // try {
    //   const { file } = req;
    //   if (!file) return res.status(404).json('ERROR/ERROR_OCCURED');

    //   const { fieldname, filename } = file || {};

    //   console.log({ fieldname, filename });

    //   if (fieldname === 'profilePic') {
    //     userRecord.profilePicture = filename;
    //   }

    //   await userRecord.save();
    //   return res.status(200).json('File successfully saved');
    // } catch (e) {
    //   console.log({ e });
    //   return res.status(400).json('ERROR/ERROR_OCCURED');
    // }
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
