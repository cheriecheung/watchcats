const router = require('express').Router();
const CatSitterController = require('../controllers/CatSitterController');

router.get('/sitter/:id?', CatSitterController.get);
router.post('/sitter', CatSitterController.post);

module.exports = router;
