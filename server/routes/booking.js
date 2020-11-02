const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const BookingController = require('../controllers/BookingController');

router.get('/booking-time', verifyAccessTokenUpdate, BookingController.getAppointmentTime);
router.get('/bookings', verifyAccessTokenUpdate, BookingController.getRecords);

router.post('/booking', verifyAccessTokenUpdate, BookingController.sendRequest);
router.patch('/booking', verifyAccessTokenUpdate, BookingController.fulfillAction)

module.exports = router;
