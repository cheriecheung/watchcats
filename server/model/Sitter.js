const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  urlId: {
    type: String,
    required: false,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  },
  aboutSitter: {
    type: String,
    required: false,
  },
  // photo: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Photo',
  // },
  experience: {
    type: String,
    required: false,
  },
  hasCat: {
    type: Boolean,
    required: false,
  },
  hasVolunteered: {
    type: Boolean,
    required: false,
  },
  hasMedicationSkills: {
    type: Boolean,
    required: false,
  },
  hasInjectionSkills: {
    type: Boolean,
    required: false,
  },
  hasGroomingSkills: {
    type: Boolean,
    required: false,
  },
  hasCertification: {
    type: Boolean,
    required: false,
  },
  priceOneTime: {
    type: Number,
    required: false,
  },
  priceOvernight: {
    type: Number,
    required: false,
  },
  unavailableDate: {
    type: Schema.Types.ObjectId,
    ref: 'UnavailableDate',
  },
  emergencyName: {
    type: String,
    required: false,
  },
  emergencyNumber: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Sitter', sitterSchema);
