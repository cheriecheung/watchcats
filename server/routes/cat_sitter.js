const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');
const { validateToken } = require('../helpers/token')

router.get('/sitter/profile/:id?', validateToken, CatSitterController.getProfile);

router.get('/sitter/account', validateToken, CatSitterController.getAccount);

router.post('/sitter/account', validateToken, CatSitterController.postAccount);

module.exports = router;
