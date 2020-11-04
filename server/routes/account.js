const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token');
const AccountController = require('../controllers/AccountController');

router.get('/personal-info', verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.getPersonalInfo);
router.post('/personal-info', verifyAccessTokenUpdate, verifyAccessTokenUpdate, AccountController.postPersonalInfo);

router.get('/contact-details', verifyAccessTokenUpdate, AccountController.getContactDetails)


module.exports = router;