const router = require('express').Router();
const BookingActionController = require('../controllers/BookingActionController');

router.get('/booking/time', BookingActionController.getAppointmentTime);

router.post('/booking/request', BookingActionController.sendBookingRequest);

module.exports = router;
