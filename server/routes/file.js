const router = require('express').Router();
const FileController = require('../controllers/FileController');
const multer = require('multer');
const { validateToken } = require('../helpers/token')
const { fileLimiter, formLimiter, speedLimiter } = require('../helpers/limiter')

const { storageS3 } = FileController;

const uploadS3 = multer({ storage: storageS3 });

router.post('/image/test-picture', uploadS3.single('test_picture'), FileController.saveTestPicture)

router.delete('/image', formLimiter, speedLimiter(5), validateToken, FileController.deleteImage);

router.post('/image/profile-picture', formLimiter, speedLimiter(5), validateToken, uploadS3.single('profilePic'), FileController.saveFileName);

router.post('/image/cat', fileLimiter, speedLimiter(5), validateToken, uploadS3.single('catPhoto'), FileController.saveCatPhoto)

router.delete('/image/cat', formLimiter, speedLimiter(5), validateToken, FileController.deleteCatPhoto)


module.exports = router;
