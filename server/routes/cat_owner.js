const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');
const { validateToken } = require('../helpers/token')

router.get('/owner/profile/:id?', validateToken, CatOwnerController.getProfile);

router.get('/owner/account', validateToken, CatOwnerController.getAccount);

router.post('/owner/account', validateToken, CatOwnerController.postAccount);

module.exports = router;
