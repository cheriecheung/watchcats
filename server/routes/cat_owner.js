const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');

router.get('/owner/profile/:id?', CatOwnerController.getProfile);

router.get('/owner/account/:id?', CatOwnerController.getAccount);
router.post('/owner/account/:id?', CatOwnerController.postAccount);

module.exports = router;
