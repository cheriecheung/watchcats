const router = require('express').Router();
const BookingController = require('../controllers/BookingController');

router.post('/booking/request', BookingController.sendRequest);

module.exports = router;
