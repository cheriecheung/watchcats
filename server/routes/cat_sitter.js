const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');
const { verifyAccessTokenUpdate } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/sitter/profile/:id?', CatSitterController.getProfile);

router.get('/sitter/account/:id?', verifyAccessTokenUpdate, CatSitterController.getAccount);

router.post('/sitter/account/:id?', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, CatSitterController.postAccount);

module.exports = router;
