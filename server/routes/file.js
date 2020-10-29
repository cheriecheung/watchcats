const router = require('express').Router();
const FileController = require('../controllers/FileController');
const multer = require('multer');
const { verifyAccessTokenUpdate } = require('../helpers/token')

const { storage } = FileController;
const upload = multer({ storage });

router.get('/image/:filename', FileController.displayImage);
router.delete('/image', verifyAccessTokenUpdate, FileController.deleteImage);

router.post('/image/profile-picture', verifyAccessTokenUpdate, upload.single('profilePic'), FileController.saveFileName);
router.post('/image/address-proof', upload.single('addressProof'), FileController.saveFileName);

router.post('/image/cat', verifyAccessTokenUpdate, upload.single('catPhoto'), FileController.saveCatPhoto)
router.delete('/image/cat', verifyAccessTokenUpdate, FileController.deleteCatPhoto)


module.exports = router;
