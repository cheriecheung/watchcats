const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  hasBikeStorageNearby: {
    type: Boolean,
    required: false,
  },
  hasCarPark: {
    type: Boolean,
    required: false,
  },
  hasKids: {
    type: Boolean,
    required: false,
  },
  hasMultipleCats: {
    type: Boolean,
    required: false,
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
