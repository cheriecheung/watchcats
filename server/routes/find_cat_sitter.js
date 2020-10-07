const router = require('express').Router();
const FindCatSitterController = require('../controllers/FindCatSitterController');

router.get('/sitter', FindCatSitterController.getAllSitters);

module.exports = router;
