const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')

// Stripe
router.get('/onboard-user', PaymentController.onboardUser);

router.get('/onboard-user/refresh', PaymentController.onboardRefresh);

router.post('/payment', formLimiter, speedLimiter(5), PaymentController.getClientSecret);

module.exports = router;
