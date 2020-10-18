const router = require('express').Router();
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const UserController = require('../controllers/UserController');

router.get('/user', UserController.get);
router.post('/user', UserController.post);

router.post('/register', UserController.register);
router.post('/activate-account-email', UserController.requestActivationEmail)

// router.post('/send-verify-email', async (req, res) => {
//   // const {}
// })

router.post('/forgot-password', UserController.forgotPassword);
router.post('/password-reset', verifyAccessToken, UserController.passwordReset);

module.exports = router;
