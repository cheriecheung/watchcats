const router = require('express').Router();
const { verifyAccessToken, verifyAccessTokenUpdate } = require('../helpers/token');
const { generateCodes, authenticateUser } = require('../helpers/authentication');
const AuthController = require('../controllers/AuthController');
const { authenticationLimiter, speedLimiter } = require('../helpers/limiter')

// rate limit
router.post('/refresh_token', AuthController.getNewAccessToken)

router.post('/login', authenticationLimiter, speedLimiter(30), AuthController.login)

router.delete('/logout', verifyAccessTokenUpdate, AuthController.logout);

router.post('/activate-account', verifyAccessToken, AuthController.activateAccount);

router.get('/googlelogin', generateCodes, AuthController.googleLogin);
router.get('/oauth2callback', authenticateUser);
router.get('/getUser', AuthController.googleUser);

router.put('/password', authenticationLimiter, speedLimiter(30), AuthController.resetPassword)


module.exports = router;
