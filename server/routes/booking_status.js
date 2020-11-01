const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const BookingStatusController = require('../controllers/BookingStatusController');

router.get('/sitting-job', verifyAccessTokenUpdate, BookingStatusController.getSittingJobs);
router.get('/sitting-service', verifyAccessTokenUpdate, BookingStatusController.getSittingService);

module.exports = router;
