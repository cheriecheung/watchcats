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
  // photos: {
  // },
  // appointmentOneTime: {
  // },
  // appointmentOvernight: {
  // },
  hasBikeStorageNearby: {
    type: Boolean,
  },
  hasCarPark: {
    type: Boolean,
  },
  hasKids: {
    type: Boolean,
  },
  hasMultipleCats: {
    type: Boolean,
  },
  catsDescription: {
    type: Text,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Owner', ownerSchema);
