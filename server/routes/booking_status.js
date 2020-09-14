const router = require('express').Router();
const BookingStatusController = require('../controllers/BookingStatusController');

router.get('/sitting-job/requested', BookingStatusController.getRequestedSittingJobs);
router.get('/sitting-job/confirmed', BookingStatusController.getConfirmedSittingJobs);
router.get('/sitting-job/completed', BookingStatusController.getCompletedSittingJobs);
router.get('/sitting-job/cancelled', BookingStatusController.getCancelledSittingJobs);

router.get('/sitting-service/requested', BookingStatusController.getRequestedSittingService);
router.get('/sitting-service/confirmed', BookingStatusController.getConfirmedSittingService);
router.get('/sitting-service/completed', BookingStatusController.getCompletedSittingService);
router.get('/sitting-service/cancelled', BookingStatusController.getCancelledSittingService);

module.exports = router;
