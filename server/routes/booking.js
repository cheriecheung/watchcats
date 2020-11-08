const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const BookingController = require('../controllers/BookingController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/booking-time', verifyAccessTokenUpdate, BookingController.getAppointmentTime);

router.get('/bookings', verifyAccessTokenUpdate, BookingController.getRecords);

router.post('/booking', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, BookingController.sendRequest);

router.patch('/booking', verifyAccessTokenUpdate, BookingController.fulfillAction)

module.exports = router;
