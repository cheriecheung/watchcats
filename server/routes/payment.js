const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/payment', PaymentController.getClientSecret);

module.exports = router;
