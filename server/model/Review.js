const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onReviewer'
  },
  onReviewer: {
    type: String,
    required: true,
    enum: ['Owner', 'Sitter']
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onReviewee'
  },
  onReviewee: {
    type: String,
    required: true,
    enum: ['Owner', 'Sitter']
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
