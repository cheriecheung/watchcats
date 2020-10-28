const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');
const { verifyAccessTokenUpdate } = require('../helpers/token')

router.get('/sitter/profile/:id?', CatSitterController.getProfile);
router.get('/sitter/account/:id?', verifyAccessTokenUpdate, CatSitterController.getAccount);
router.post('/sitter/account/:id?', verifyAccessTokenUpdate, CatSitterController.postAccount);

module.exports = router;
