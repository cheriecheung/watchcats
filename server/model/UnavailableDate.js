const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unavailableDateSchema = new Schema({
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
  },
  date: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('UnavailableDate', unavailableDateSchema);
