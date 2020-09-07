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
  time: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
