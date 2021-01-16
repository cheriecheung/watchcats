const router = require('express').Router();
const BookingController = require('../controllers/BookingController');
const { validateToken } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/booking-time', validateToken, BookingController.getAppointmentTime);

router.get('/bookings', validateToken, BookingController.getBookings);

router.post('/booking', formLimiter, speedLimiter(5), validateToken, BookingController.sendRequest);

// :id?
router.patch('/booking', validateToken, BookingController.fulfillAction)

router.get('/booking/:id?', validateToken, BookingController.getBooking)

module.exports = router;
