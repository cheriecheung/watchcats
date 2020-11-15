const router = require('express').Router();
const FileController = require('../controllers/FileController');
const multer = require('multer');
const { verifyAccessTokenUpdate } = require('../helpers/token')
const { fileLimiter, formLimiter, speedLimiter } = require('../helpers/limiter')

const { storage } = FileController;
const upload = multer({ storage });

router.post('/image/test-picture', upload.single('test_picture'), FileController.saveTestPicture)

router.get('/image/:filename', FileController.displayImage);

router.delete('/image', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, FileController.deleteImage);

router.post('/image/profile-picture', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, upload.single('profilePic'), FileController.saveFileName);

router.post('/image/cat', fileLimiter, speedLimiter(5), verifyAccessTokenUpdate, upload.single('catPhoto'), FileController.saveCatPhoto)

router.delete('/image/cat', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, FileController.deleteCatPhoto)


module.exports = router;
