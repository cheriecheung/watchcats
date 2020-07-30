const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: false,
    max: 255,
    min: 6,
  },
  email: {
    type: String,
    required: false,
    max: 255,
    min: 5,
  },
  phone: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Member', memberSchema);
