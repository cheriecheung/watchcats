const router = require('express').Router();
const BookingController = require('../controllers/BookingController');

router.get('/booking/time', BookingController.getAppointmentTime);
router.post('/booking/request', BookingController.sendRequest);

module.exports = router;
