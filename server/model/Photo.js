const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  cat: {
    type: Schema.Types.ObjectId,
    ref: 'Cat',
    required: false,
  },
  photo: {
    type: String, // sitter or owner or cat photo?
    required: true,
  },
  type: {
    type: String, // sitter or owner or cat photos?
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Photo', photoSchema);
