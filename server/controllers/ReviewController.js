const Review = require('../model/Review');
const User = require('../model/User');
const { sendSMS } = require('../helpers/sms')

module.exports = {
  submitReview: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    const { reviewer, reviewee, content, rating } = req.body;

    const revieweeUserRecord = await User.findOne({
      $or: [{ owner: reviewee }, { sitter: reviewee }],
    })
    if (!userId) return res.status(401).json('Reviewees\'s user record not found');

    const { firstName, lastName, phone } = revieweeUserRecord;

    try {
      const newReview = new Review({ reviewer, reviewee, content, rating })
      await newReview.save();

      sendSMS(phone, 'REVIEW_RECEIEVED', { name: `${firstName} ${lastName}` })

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