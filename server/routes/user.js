const router = require('express').Router();
const { verifyAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');
const { verifyAccessTokenUpdate } = require('../helpers/token')

router.get('/user', verifyAccessTokenUpdate, UserController.get);
router.post('/user', verifyAccessTokenUpdate, UserController.post);

router.post('/register', UserController.register);
router.post('/activate-account-email', UserController.getActivationEmail)

// revoke token when forgot password
router.post('/forgot-password-email', UserController.getPasswordResetEmail);
router.post('/password-reset', verifyAccessToken, UserController.resetPassword);

module.exports = router;
