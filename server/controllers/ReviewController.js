const Booking = require('../model/Booking');
const Review = require('../model/Review');
const User = require('../model/User');
const { sendTwilioSMS } = require('../helpers/sms')
const { sendNewReviewMail } = require('../helpers/mailer')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  submitReview: async (req, res) => {
    const { userId: reviewerUserId } = req.verifiedData
    if (!reviewerUserId) return res.status(403).json('ERROR/USER_NOT_FOUND');

    const { review: content, rating } = req.body;
    const { bookingId } = req.params;

    try {
      const bookingInfo = await Booking
        .findById(bookingId)
        .select(['id',])
        .populate({
          path: 'owner',
          select: ['user'],
          populate: {
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'getEmailNotification', 'phone', 'getSmsNotification'],
          }
        })
        .populate({
          path: 'sitter',
          select: ['user'],
          populate: {
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'getEmailNotification', 'phone', 'getSmsNotification'],
          }
        })

      const { owner, sitter } = bookingInfo;

      const ownerUserId = owner.user._id;
      const sitterUserId = sitter.user._id;

      let reviewObj = {};

      let reviewerUserRecord,
        revieweeUserRecord,
        hasReviewWrittenField;

      if (ownerUserId.equals(ObjectId(reviewerUserId))) {
        reviewObj = {
          reviewer: owner._id,
          reviewee: sitter._id,
          onReviewer: 'Owner',
          onReviewee: 'Sitter'
        }

        reviewerUserRecord = owner.user;
        revieweeUserRecord = sitter.user;
        hasReviewWrittenField = { hasReviewWrittenByOwner: true }
      }

      if (sitterUserId.equals(ObjectId(reviewerUserId))) {
        reviewObj = {
          reviewer: sitter._id,
          reviewee: owner._id,
          onReviewer: 'Sitter',
          onReviewee: 'Owner'
        }

        reviewerUserRecord = sitter.user;
        revieweeUserRecord = owner.user;
        hasReviewWrittenField = { hasReviewWrittenBySitter: true }
      }

      const newReview = await new Review({
        booking: bookingId,
        content,
        rating,
        ...reviewObj
      })
      if (!newReview) return res.status(401).json('ERROR/ERROR_OCCURED');
      await newReview.save();

      const bookingRecord = await Booking.findOneAndUpdate(
        { _id: bookingId },
        { $set: hasReviewWrittenField },
        { useFindAndModify: false }
      );
      if (!bookingRecord) return res.status(401).json('ERROR/ERROR_OCCURED')

      const { firstName, lastName } = reviewerUserRecord;
      const reviewerName = `${firstName} ${lastName.charAt(0)}`

      const {
        email,
        getEmailNotification,
        phone,
        getSmsNotification
      } = revieweeUserRecord;

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