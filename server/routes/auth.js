const router = require('express').Router();
const { verifyAccessToken, verifyAccessTokenUpdate, verifyActivationLinkToken } = require('../helpers/token');
const { generateCodes, authenticateUser } = require('../helpers/authentication');
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
router.get('/oauth2callback', authenticateUser);
router.get('/getUser', AuthController.googleUser);

router.put('/password', authenticationLimiter, speedLimiter(30), verifyAccessTokenUpdate, AuthController.resetPassword)


module.exports = router;
