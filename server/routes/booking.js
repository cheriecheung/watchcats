const router = require('express').Router();
const BookingController = require('../controllers/BookingController');
const { validateToken } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/booking-time', validateToken, BookingController.getAppointmentTime);

router.get('/bookings', validateToken, BookingController.getRecords);

router.post('/booking', formLimiter, speedLimiter(5), validateToken, BookingController.sendRequest);

router.patch('/booking', validateToken, BookingController.fulfillAction)

router.get('/booking/:bookingId?', validateToken, BookingController.getBookingInfo)

module.exports = router;
