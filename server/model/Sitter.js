const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  urlId: {
    type: String,
    required: false,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: false,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: false,
  },
  aboutSitter: {
    type: String,
  },
  experience: {
    type: String,
    required: true,
  },
  hasCat: {
    type: Boolean,
  },
  hasVolunteered: {
    type: Boolean,
  },
  hasMedicationSkills: {
    type: Boolean,
  },
  hasInjectionSkills: {
    type: Boolean,
  },
  hasGroomingSkills: {
    type: Boolean,
  },
  hasCertification: {
    type: Boolean,
  },
  hourlyRate: {
    type: Number,
  },
  nightlyRate: {
    type: Number,
    required: false,
  },
  unavailableDate: {
    type: Schema.Types.ObjectId,
    ref: 'UnavailableDate',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Sitter', sitterSchema);
