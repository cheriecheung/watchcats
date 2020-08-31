const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');

router.get('/sitter/profile/:id?', CatSitterController.getProfile);

router.get('/sitter/account/:id?', CatSitterController.getAccount);
router.post('/sitter/account/:id?', CatSitterController.postAccount);

module.exports = router;
