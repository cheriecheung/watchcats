const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
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
  hasWrittenReview: {
    type: Boolean,
  },
  isReadBy: {
    type: Array,
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
