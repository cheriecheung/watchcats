const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { validateToken } = require('../helpers/token');
const { generateCodes } = require('../helpers/authentication');
const { authLimiter, speedLimiter } = require('../helpers/limiter')

router.post('/refresh-token', AuthController.getNewAccessToken)

router.post('/activate-account', (req, res, next) => {
  res.locals.type = "activateAccount";
  next();
}, validateToken, AuthController.activateAccount);
router.post('/login', authLimiter, speedLimiter(30), AuthController.login)
router.delete('/logout', validateToken, AuthController.logout);

router.get('/googlelogin', generateCodes, AuthController.googleLogin);
router.get('/oauth2callback', AuthController.authenticateGoogleUser);

router.put('/password', authLimiter, speedLimiter(30), validateToken, AuthController.resetPassword)
router.post('/password', (req, res, next) => {
  res.locals.type = "resetPassword";
  next();
},
  validateToken, AuthController.resetForgotPassword)

module.exports = router;
