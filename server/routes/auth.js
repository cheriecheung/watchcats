const router = require('express').Router();
const { verifyAccessToken, verifyAccessTokenUpdate } = require('../helpers/token');
const { generateCodes, authenticateUser } = require('../helpers/authentication');
const AuthController = require('../controllers/AuthController');

router.post('/refresh_token', AuthController.getNewAccessToken)

router.post('/login', AuthController.login)
router.delete('/logout', verifyAccessTokenUpdate, AuthController.logout);

router.post('/activate-account', verifyAccessToken, AuthController.activateAccount);

router.get('/googlelogin', generateCodes, AuthController.googleLogin);
router.get('/oauth2callback', authenticateUser);
router.get('/getUser', AuthController.googleUser);

router.put('/password', AuthController.resetPassword)


module.exports = router;
