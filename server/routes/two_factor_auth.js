const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const TwoFactorAuthController = require('../controllers/TwoFactorAuthController');
const { authenticationLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/google-authenticator-qrcode', verifyAccessTokenUpdate, TwoFactorAuthController.getGoogleAuthenticatorQrCode)

router.post('/google-authenticator-verify-code', authenticationLimiter, speedLimiter(5), verifyAccessTokenUpdate, TwoFactorAuthController.activateTwoFactorAuthentication)

router.post('/phone-login', authenticationLimiter, speedLimiter(5), TwoFactorAuthController.phoneLogin)

module.exports = router;
