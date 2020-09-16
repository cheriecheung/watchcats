const router = require('express').Router();
const BookingStatusController = require('../controllers/BookingStatusController');

router.get('/sitting-job/requested', BookingStatusController.getRequestedSittingJobs);
router.get('/sitting-job/confirmed', BookingStatusController.getConfirmedSittingJobs);
router.get('/sitting-job/completed', BookingStatusController.getCompletedSittingJobs);
router.get('/sitting-job/declined', BookingStatusController.getDeclinedSittingJobs);

router.get('/sitting-service/requested', BookingStatusController.getRequestedSittingService);
router.get('/sitting-service/confirmed', BookingStatusController.getConfirmedSittingService);
router.get('/sitting-service/completed', BookingStatusController.getCompletedSittingService);
router.get('/sitting-service/declined', BookingStatusController.getDeclinedSittingService);

module.exports = router;
