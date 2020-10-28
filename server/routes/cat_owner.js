const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');
const { verifyAccessTokenUpdate } = require('../helpers/token')

router.get('/owner/profile/:id?', CatOwnerController.getProfile);

router.get('/owner/account/:id?', verifyAccessTokenUpdate, CatOwnerController.getAccount);
router.post('/owner/account/:id?', verifyAccessTokenUpdate, CatOwnerController.postAccount);

module.exports = router;
