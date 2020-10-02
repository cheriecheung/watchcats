const mongoose = require('mongoose');
const router = require('express').Router();
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const User = require('../model/User');
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

router.get(
  '/user',
  async (req, res, next) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    const { profilePictureId } = user || {};
    if (!profilePictureId) return next();

    const profilePic = await gfs.files.findOne({ _id: profilePictureId });
    const { filename } = profilePic || {};
    if (!profilePic || !filename) return next();

    res.locals.profilePicFileName = profilePicFileName;
    return next();
  },
  UserController.get
);

router.get('/user/picture/:filename', async (req, res) => {
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

router.delete('/user/picture', async (req, res) => {
  const userId = req.headers['authorization'];
  if (!userId) return res.status(403).json('User id missing');

  try {
    await gfs.remove({ _id: '5f76dcbac2cba76a309372a1', root: 'uploads' });
    return res.status(200).json('Picture successfully deleted');
  } catch (err) {
    console.log({ err });
    return res.status(404).json('Picture does not exist');
  }
});

router.post('/user', UserController.post);
router.post('/user/profile-picture', upload.single('profilePic'), UserController.saveFileId);
router.post('/user/address-proof', upload.single('addressProof'), UserController.saveFileId);

router.post('/register', UserController.register);

// router.post('/send-verify-email', async (req, res) => {
//   // const {}
// })

router.post('/forgot-password', UserController.forgotPassword);

router.post('/password-reset', verifyAccessToken, UserController.passwordReset);

module.exports = router;
