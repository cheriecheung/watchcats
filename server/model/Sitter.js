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
  // photos: {
  // },
  experience: {
    type: Text,
    required: true,
  },
  hasCat: {
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
  priceOneTime: {
    type: Number,
    required: true,
  },
  priceOvernight: {
    type: Number,
    required: true,
  },
  //   availableDates: {
  //   },
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
  },
});

module.exports = mongoose.model('Sitter', sitterSchema);
