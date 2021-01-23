const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

const userSchema = new Schema({
  urlId: {
    type: String,
    default: shortid.generate(),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
    required: false
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 8,
  },
  phone: {
    type: String,
  },
  getEmailNotification: {
    type: Boolean,
  },
  getSmsNotification: {
    type: Boolean,
  },
  address: {
    type: String,
  },
  postcode: {
    type: String,
  },
  coordinates: {
    type: [Number],
    index: '2d'
  },
  profileFacebook: {
    type: String,
  },
  profileInstagram: {
    type: String,
  },
  profileOther: {
    type: String,
  },
  password: {
    type: String,
    max: 1024,
    min: 6,
  },
  stripeAccountId: {
    type: String,
  },
  isStripeAccountVerified: {
    type: Boolean,
    defaultValue: false,
  },
  isVerified: {
    type: Boolean,
    defaultValue: false,
  },
  twoFactorSecret: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiryTime: {
    type: Date,
  },
  // google_id: {
  //   type: String,
  //   required: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.isValidPassword = async (filledPassword) => {
  try {
    return await bcrypt.compare(filledPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', userSchema);
