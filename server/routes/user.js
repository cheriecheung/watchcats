const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authLimiter, speedLimiter } = require('../helpers/limiter')

router.post(`/generate-test-accounts`, UserController.generateTestAccounts)

router.post('/register', authLimiter, speedLimiter(30), UserController.register);

router.post('/activate-account-email', authLimiter, speedLimiter(30), UserController.getActivationEmail)

// revoke token when forgot password
router.post('/forgot-password-email', authLimiter, speedLimiter(30), UserController.getPasswordResetEmail);

module.exports = router;
