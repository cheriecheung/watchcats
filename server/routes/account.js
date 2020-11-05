const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token');
const AccountController = require('../controllers/AccountController');

router.get('/personal-info', verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.getPersonalInfo);
router.post('/personal-info', verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.postPersonalInfo);

router.get('/contact-details', verifyAccessTokenUpdate, AccountController.getContactDetails)

router.post('/phone-number', verifyAccessTokenUpdate, AccountController.submitPhoneNumber)
router.patch('/phone-number', verifyAccessTokenUpdate, AccountController.verifyPhoneNumber)

module.exports = router;