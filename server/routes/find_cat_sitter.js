const router = require('express').Router();
const FindCatSitterController = require('../controllers/FindCatSitterController');

router.get('/sitter', FindCatSitterController.getCatSittersInBounds);

module.exports = router;
