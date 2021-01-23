const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  urlId: {
    type: String,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: false
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: false
  },
  aboutMe: {
    type: String,
  },
  appointmentOneDay: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentOneDay',
  },
  appointmentOvernight: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentOvernight',
    required: false
  },
  catsDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Owner', ownerSchema);
