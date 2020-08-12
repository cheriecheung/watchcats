const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  medicalNeeds: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  favouriteTreat: {
    type: String,
    required: true,
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
