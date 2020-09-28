const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');

// Stripe
router.get('/onboard-user', PaymentController.onboardUser);

router.get('/onboard-user/refresh', PaymentController.onboardRefresh);

router.post('/payment', PaymentController.getClientSecret);

module.exports = router;
