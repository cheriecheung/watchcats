const router = require('express').Router();
const { verifyAccessToken, verifyAccessTokenUpdate, verifyActivationLinkToken, verifyResetPasswordLinkToken } = require('../helpers/token');
const { generateCodes } = require('../helpers/authentication');
const AuthController = require('../controllers/AuthController');
const { authenticationLimiter, speedLimiter } = require('../helpers/limiter')
const logger = require('../helpers/logger')

// router.get('/test_logger', (req, res) => {
//   logger.info('I am an info log', { name: 'George', tutorial: 'Logging tutorial' });
//   return res.json({ logged: true });
// })

// rate limit
router.post('/refresh_token', AuthController.getNewAccessToken)

router.post('/login', authenticationLimiter, speedLimiter(30), AuthController.login)

router.delete('/logout', verifyAccessTokenUpdate, AuthController.logout);

router.post('/activate-account', verifyActivationLinkToken, AuthController.activateAccount);

router.get('/googlelogin', generateCodes, AuthController.googleLogin);
router.get('/oauth2callback', AuthController.authenticateGoogleUser);

router.put('/password', authenticationLimiter, speedLimiter(30), verifyAccessTokenUpdate, AuthController.resetPassword)

router.post('/password', verifyResetPasswordLinkToken, AuthController.resetForgotPassword)

module.exports = router;
