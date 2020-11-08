const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const TwoFactorAuthController = require('../controllers/TwoFactorAuthController');
const { authenticationLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/google-authenticator-qrcode', verifyAccessTokenUpdate, TwoFactorAuthController.getGoogleAuthenticatorQrCode)

router.post('/google-authenticator-verify-code', authenticationLimiter, speedLimiter(30), verifyAccessTokenUpdate, TwoFactorAuthController.verifyGoogleAuthenticatorCode)

module.exports = router;
