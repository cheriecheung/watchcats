const Booking = require('../model/Booking')
const Review = require('../model/Review');
const User = require('../model/User');
const { sendTwilioSMS } = require('../helpers/sms')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  submitReview: async (req, res) => {
    const { userId: reviewerUserId } = req.verifiedData
    if (!reviewerUserId) return res.status(403).json('User id missing');

    const { review: content, rating } = req.body;
    const { bookingId } = req.params

    try {
      const bookingRecord = await Booking.findById(bookingId)
      if (!bookingRecord) return res.status(401).json('Booking not found');

      const bookingIds = [
        ObjectId(bookingRecord.owner).toString(),
        ObjectId(bookingRecord.sitter).toString()
      ];

      const reviewerUserRecord = await User.findById(reviewerUserId)
      if (!reviewerUserRecord) return res.status(401).json('User record not found');

      const reviewerIds = [
        ObjectId(reviewerUserRecord.owner).toString(),
        ObjectId(reviewerUserRecord.sitter).toString()
      ]

      const reviewer = bookingIds.find(id => reviewerIds.includes(id));
      const reviewee = bookingIds.find(id => id !== reviewer)

      const newReview = new Review({ reviewer, reviewee, content, rating })
      await newReview.save();

      const revieweeUserRecord = await User.findOne({
        $or: [{ owner: reviewee }, { sitter: reviewee }],
      })
      if (!revieweeUserRecord) return res.status(401).json('User record not found');

      const { firstName, lastName } = reviewerUserRecord;
      const { phone } = revieweeUserRecord;

      sendTwilioSMS(phone, 'REVIEW_RECEIEVED', { name: `${firstName} ${lastName}` })

      return res.status(200).json('Successful submitted review')
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Unable to save review');
    }
  },

  getReviews: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

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
      return res.status(401).json('User id missing');
    }
  }
}