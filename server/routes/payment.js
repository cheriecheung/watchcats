const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')
const { verifyAccessTokenUpdate } = require('../helpers/token')

// Stripe
router.get('/onboard-user', verifyAccessTokenUpdate, PaymentController.onboardUser);

router.get('/onboard-user/refresh', PaymentController.onboardRefresh);

router.post('/payment', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, PaymentController.getClientSecret);

module.exports = router;
