const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController');
const { validateToken } = require('../helpers/token')
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/reviews', validateToken, ReviewController.getReviews);

router.post('/review/:bookingId?', formLimiter, speedLimiter(5), validateToken, ReviewController.submitReview);

module.exports = router;
