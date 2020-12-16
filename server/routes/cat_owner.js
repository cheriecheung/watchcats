const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');
const { verifyAccessTokenUpdate } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/owner/profile/:id?', verifyAccessTokenUpdate, CatOwnerController.getProfile);

router.get('/owner/account', verifyAccessTokenUpdate, CatOwnerController.getAccount);

router.post('/owner/account', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, CatOwnerController.postAccount);

module.exports = router;
