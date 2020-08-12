const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  aboutMe: {
    type: Text,
    required: true,
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
  },
  // appointmentOneTime: {
  // },
  // appointmentOvernight: {
  // },
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
    type: Text,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Owner', ownerSchema);
