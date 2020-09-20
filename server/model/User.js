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
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
  },
  cat: {
    type: Schema.Types.ObjectId,
    ref: 'Cat',
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  profilePictureId: {
    type: Schema.Types.ObjectId,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  postcode: {
    type: String,
    required: false,
  },
  addressProofId: {
    type: String,
    type: Schema.Types.ObjectId,
  },
  isAddressProofVerified: {
    type: String,
    required: false,
  },
  profileFacebook: {
    type: String,
    required: false,
  },
  profileInstagram: {
    type: String,
    required: false,
  },
  profileOther: {
    type: String,
    required: false,
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
  refreshToken: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    defaultValue: false,
  },
  isEnabled2FA: {
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
  isDeleted: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
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
