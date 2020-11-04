const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const TwoFactorAuthController = require('../controllers/TwoFactorAuthController');

router.get('/google-authenticator-qrcode', verifyAccessTokenUpdate, TwoFactorAuthController.getGoogleAuthenticatorQrCode)

router.post('/google-authenticator-verify-code', verifyAccessTokenUpdate, TwoFactorAuthController.verifyGoogleAuthenticatorCode)

module.exports = router;
