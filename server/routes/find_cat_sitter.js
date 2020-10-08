const router = require('express').Router();
const FindCatSitterController = require('../controllers/FindCatSitterController');

router.get('/sitter', FindCatSitterController.getAllSitters);

router.get('/sitter/available', FindCatSitterController.searchByDate);

module.exports = router;
