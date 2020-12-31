const router = require('express').Router();
const TwoFactorAuthController = require('../controllers/TwoFactorAuthController');
const { validateToken } = require('../helpers/token')
const { authLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/google-authenticator-qrcode', validateToken, TwoFactorAuthController.getGoogleAuthenticatorQrCode)

router.post('/google-authenticator-verify-code', authLimiter, speedLimiter(5), validateToken, TwoFactorAuthController.activateTwoFactorAuthentication)

router.post('/phone-login', authLimiter, speedLimiter(5), TwoFactorAuthController.phoneLogin)

router.delete('/phone-login', authLimiter, speedLimiter(5), validateToken, TwoFactorAuthController.disableTwoFactor)

module.exports = router;
