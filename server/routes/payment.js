const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')
const { validateToken } = require('../helpers/token')

// Stripe
router.get('/onboard-user', validateToken, PaymentController.onboardUser);

router.get('/onboard-user/refresh', PaymentController.onboardRefresh);

router.post('/payment', formLimiter, speedLimiter(5), validateToken, PaymentController.getClientSecret);

module.exports = router;
