const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  needsInjection: {
    type: Boolean,
  },
  needsPill: {
    type: Boolean,
  },
  isVaccinated: {
    type: Boolean,
  },
  isInsured: {
    type: Boolean,
  },
  breed: {
    type: Number,
  },
  personality: {
    type: Number,
  },
  favouriteTreat: {
    type: String,
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Cat', catSchema);
