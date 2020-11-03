const router = require('express').Router();
const { verifyAccessTokenUpdate } = require('../helpers/token')
const ReviewController = require('../controllers/ReviewController');

router.get('/reviews', verifyAccessTokenUpdate, ReviewController.getReviews);
router.post('/review', verifyAccessTokenUpdate, ReviewController.submitReview);

module.exports = router;
