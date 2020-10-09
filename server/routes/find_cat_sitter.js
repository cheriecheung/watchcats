const router = require('express').Router();
const FindCatSitterController = require('../controllers/FindCatSitterController');

router.get('/sitter', FindCatSitterController.getAllSitters);

router.get('/sitter/availability', FindCatSitterController.filterByDate);

module.exports = router;
