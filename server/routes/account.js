const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token');
const AccountController = require('../controllers/AccountController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/personal-info', verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.getPersonalInfo);

router.post('/personal-info', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.postPersonalInfo);

router.get('/contact-details', verifyAccessTokenUpdate, AccountController.getContactDetails)

router.post('/notification', verifyAccessTokenUpdate, AccountController.changeNotification)

router.post('/phone-number', verifyAccessTokenUpdate, AccountController.submitPhoneNumber)

router.post('/verification-code', verifyAccessTokenUpdate, AccountController.resendOtpToInputtedPhoneNumber)

// 401 unauthorized always "Access denied" when verifying token
router.post('/verification-code', verifyAccessTokenUpdate, AccountController.sendOtpToSavedPhoneNumber)

// rate limit
router.patch('/phone-number', verifyAccessTokenUpdate, AccountController.verifyPhoneNumber)

router.delete('/phone-number', verifyAccessTokenUpdate, AccountController.deletePhoneNumber)

module.exports = router;