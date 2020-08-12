const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitterSchema = new Schema({
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
  experience: {
    type: Text,
    required: true,
  },
  hasCat: {
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
    required: true,
  },
  priceOvernight: {
    type: Number,
    required: true,
  },
  unavailableDate: {
    type: Schema.Types.ObjectId,
    ref: 'UnavailableDate',
  },
  emergencyContactNumber: {
    type: String,
    required: true,
  },
  emergencyContactName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Sitter', sitterSchema);
