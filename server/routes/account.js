const router = require('express').Router();
const AccountController = require('../controllers/AccountController');
const { validateToken } = require('../helpers/token');
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/personal-info', validateToken, AccountController.getPersonalInfo);

router.post('/personal-info', formLimiter, speedLimiter(5), validateToken, AccountController.postPersonalInfo);

router.get('/contact-details', validateToken, AccountController.getContactDetails)

router.post('/notification', validateToken, AccountController.changeNotification)

router.post('/phone-number', validateToken, AccountController.submitPhoneNumber)

// get instead of post
router.post('/verification-code', validateToken, AccountController.resendOtpToInputtedPhoneNumber)

// get instead of patch
// 401 unauthorized always "Access denied" when verifying token
router.patch('/verification-code', validateToken, AccountController.sendOtpToSavedPhoneNumber)

// rate limit
router.patch('/phone-number', validateToken, AccountController.verifyPhoneNumber)

router.delete('/phone-number', validateToken, AccountController.deletePhoneNumber)

module.exports = router;