const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
    required: true
  },
  location: {
    type: String,
  },
  appointmentType: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
  },
  hasPaid: {
    type: Boolean,
  },
  isReadByOwner: {
    type: Boolean,
    default: false
  },
  isReadBySitter: {
    type: Boolean,
    default: false
  },
  hasReviewLeftByOwner: {
    type: Boolean,
    default: false,
  },
  hasReviewLeftBySitter: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
