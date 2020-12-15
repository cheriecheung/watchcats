const Review = require('../model/Review');
const User = require('../model/User');
const { sendTwilioSMS } = require('../helpers/sms')
const { sendNewReviewMail } = require('../helpers/mailer')
const { getInfo } = require('../helpers/bookings')

module.exports = {
  submitReview: async (req, res) => {
    const { userId: reviewerUserId } = req.verifiedData
    if (!reviewerUserId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const { review: content, rating } = req.body;
    const { bookingId } = req.params

    try {
      const { reviewer, reviewee, error } = await getInfo(bookingId, reviewerUserId);
      if (error) return res.status(401).json('ERROR/ERROR_OCCURED')

      const newReview = new Review({
        reviewer: reviewer._id,
        reviewee: reviewee._id,
        content,
        rating
      })
      await newReview.save();
      if (!newReview) return res.status(401).json('ERROR/ERROR_OCCURED')

      const { firstName, lastName } = reviewer;

      const {
        email,
        getEmailNotification,
        phone,
        getSmsNotification
      } = reviewee;

      const reviewerName = `${firstName} ${lastName}`

      if (email && getEmailNotification) {
        sendNewReviewMail({ email, name: reviewerName })
      }

      if (phone && getSmsNotification) {
        sendTwilioSMS(phone, 'REVIEW_RECEIEVED', { name: reviewerName })
      }

      return res.status(200).json('Successful submitted review')
    } catch (err) {
      console.log({ err })
      return res.status(401).json('ERROR/ERROR_OCCURED');
    }
  },

  getReviews: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const { type } = req.query;

    try {
      const { owner, sitter } = await User.findById(userId)
      let reviews;

      if (type === 'owner') {
        reviews = await Review.find({ owner })
      } else {
        reviews = await Review.find({ sitter })
      }

      return res.status(200).json(reviews)
    } catch (err) {
      console.log({ err })
      return res.status(401).json('ERROR/ERROR_OCCURED');
    }
  }
}