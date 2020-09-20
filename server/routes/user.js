const router = require('express').Router();
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const { referenceProfileImage } = require('../model/User');

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

router.get('/user', UserController.get);
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
