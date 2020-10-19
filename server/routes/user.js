const router = require('express').Router();
const { verifyAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');

router.get('/user', UserController.get);
router.post('/user', UserController.post);

router.post('/register', UserController.register);
router.post('/activate-account-email', UserController.getActivationEmail)

router.post('/forgot-password-email', UserController.getPasswordResetEmail);
router.post('/password-reset', verifyAccessToken, UserController.resetPassword);

module.exports = router;
