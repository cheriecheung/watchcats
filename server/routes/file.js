const router = require('express').Router();
const FileController = require('../controllers/FileController');
const multer = require('multer');

const { storage } = FileController;
const upload = multer({ storage });

router.get('/image/:filename', FileController.displayImage);
router.delete('/image', FileController.deleteImage);

router.post('/image/profile-picture', upload.single('profilePic'), FileController.saveFileName);
router.post('/image/address-proof', upload.single('addressProof'), FileController.saveFileName);

// router.post('/image/cat', upload.array('catPhotos'), FileController.saveCatPhotos)
router.post('/image/cat', upload.single('catPhoto'), FileController.saveCatPhoto)
router.delete('/image/cat', FileController.deleteCatPhoto)


module.exports = router;
