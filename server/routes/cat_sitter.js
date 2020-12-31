const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');
const { validateToken } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/sitter/profile/:id?', validateToken, CatSitterController.getProfile);

router.get('/sitter/account', validateToken, CatSitterController.getAccount);

router.post('/sitter/account', formLimiter, speedLimiter(5), validateToken, CatSitterController.postAccount);

module.exports = router;
