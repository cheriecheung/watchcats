const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: {
    type: String,
    required: false,
  },
  reviewee: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
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
    required: false,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
