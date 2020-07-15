const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
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
  secretToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    defaultValue: false,
  },
  google_id: {
    type: String,
    required: false,
  },
  facebook_id: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.isValidPassword = async function (filledPassword) {
  try {
    return await bcrypt.compare(filledPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', userSchema);
