const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const BookingStatusController = require('../controllers/BookingStatusController');

router.get('/bookings', verifyAccessTokenUpdate, BookingStatusController.getBookingRecords);

module.exports = router;
