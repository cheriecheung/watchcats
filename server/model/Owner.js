const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  urlId: {
    type: String,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
  aboutMe: {
    type: String,
    required: true,
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
    required: false,
  },
  appointmentOneDay: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentOneDay',
  },
  appointmentOvernight: {
    type: Schema.Types.ObjectId,
    ref: 'AppointmentOvernight',
  },
  catsDescription: {
    type: String,
    required: false,
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now(),
  //   required: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Owner', ownerSchema);
