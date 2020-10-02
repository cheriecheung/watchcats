const mongoose = require('mongoose');
const router = require('express').Router();
const FileController = require('../controllers/FileController');
const User = require('../model/User');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.DB_CONNECT);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // buf.toString('hex')
        const filename = file.originalname;
        const fileInfo = { filename: filename, bucketName: 'uploads' };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.get('/image/:filename', async (req, res) => {
  const image = await gfs.files.findOne({ filename: req.params.filename });
  if (!image) return res.status(404).json('No image exists');

  const { contentType, filename } = image;
  if (contentType === 'image/jpeg' || contentType === 'image/png') {
    const readstream = gfs.createReadStream(filename);
    readstream.pipe(res);
  } else {
    return res.status(404).json('Not an image');
  }
});

router.delete('/image', async (req, res) => {
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
});

router.post('/image/profile-picture', upload.single('profilePic'), FileController.saveFileName);
router.post('/image/address-proof', upload.single('addressProof'), FileController.saveFileName);

module.exports = router;
