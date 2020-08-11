const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
  },
  catOwner: {
    type: Schema.Types.ObjectId,
    ref: 'CatOwner',
  },
  catSitter: {
    type: Schema.Types.ObjectId,
    ref: 'CatSitter',
  },
  cat: {
    type: Schema.Types.ObjectId,
    ref: 'Cat',
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  // profileImage: {
  //   type: String,
  // },
  phone: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  addressProof: {
    type: String,
  },
  isAddressProofVerified: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  otherLink: {
    type: String,
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
