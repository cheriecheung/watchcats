const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');
const { validateToken } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/owner/profile/:id?', validateToken, CatOwnerController.getProfile);

router.get('/owner/account', validateToken, CatOwnerController.getAccount);

router.post('/owner/account', formLimiter, speedLimiter(5), validateToken, CatOwnerController.postAccount);

module.exports = router;
