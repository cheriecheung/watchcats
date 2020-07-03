const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  // date: {
  //   type: Date,
  //   default: Date.now(),
  // },
  google_id: {
    type: String,
    required: false,
  },
  facebook_id: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', userSchema);
