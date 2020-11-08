const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');
const { verifyAccessTokenUpdate } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/owner/profile/:id?', CatOwnerController.getProfile);

router.get('/owner/account/:id?', verifyAccessTokenUpdate, CatOwnerController.getAccount);

router.post('/owner/account/:id?', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, CatOwnerController.postAccount);

module.exports = router;
