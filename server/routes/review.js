const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const ReviewController = require('../controllers/ReviewController');
const { formLimiter, speedLimiter } = require('../helpers/limiter')

router.get('/reviews', verifyAccessTokenUpdate, ReviewController.getReviews);

router.post('/review/:bookingId?', formLimiter, speedLimiter(5), verifyAccessTokenUpdate, ReviewController.submitReview);

module.exports = router;
