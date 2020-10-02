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

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    const profilePicId = user.profilePictureId;
    if (!user.profilePictureId) next();

    const profilePic = await gfs.files.findOne({ _id: profilePicId });
    const profilePicFileName = profilePic.filename;
    if (!profilePic || profilePicFileName) next();

    res.locals.profilePicFileName = profilePicFileName;
  },
  UserController.get
);

router.get('/user/profile-picture/:filename', async (req, res) => {
  const image = await gfs.files.findOne({ filename: req.params.filename });
  if (!image) return res.status(404).json('No image exists');

  console.log({ image });

  if (image.contentType === 'image/jpeg' || image.contentType === 'image/png') {
    const readstream = gfs.createReadStream(image.filename);
    readstream.pipe(res);
  } else {
    return res.status(404).json('Not an image');
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
