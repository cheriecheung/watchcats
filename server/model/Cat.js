const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  name: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  medicalNeeds: {
    type: Array,
    required: false,
  },
  isVaccinated: {
    type: Boolean,
    required: false,
  },
  isInsured: {
    type: Boolean,
    required: false,
  },
  breed: {
    type: Number,
    required: false,
  },
  personality: {
    type: Number,
    required: false,
  },
  favouriteTreat: {
    type: String,
    required: false,
  },
  // photos: {
  // },

  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Cat', catSchema);
