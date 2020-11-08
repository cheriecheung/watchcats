const router = require('express').Router();
const { verifyAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');
const { authenticationLimiter, speedLimiter } = require('../helpers/limiter')

router.post('/register', authenticationLimiter, speedLimiter(30), UserController.register);

router.post('/activate-account-email', authenticationLimiter, speedLimiter(30), UserController.getActivationEmail)

// revoke token when forgot password
router.post('/forgot-password-email', authenticationLimiter, speedLimiter(30), UserController.getPasswordResetEmail);

router.post('/password-reset', authenticationLimiter, speedLimiter(30), verifyAccessToken, UserController.resetPassword);

module.exports = router;
