const router = require('express').Router();
const CatOwnerController = require('../controllers/CatOwnerController');

router.get('/owner', CatOwnerController.get);
router.post('/owner', CatOwnerController.post);

module.exports = router;
