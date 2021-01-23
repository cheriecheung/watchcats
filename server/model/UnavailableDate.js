const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unavailableDatesSchema = new Schema({
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'Sitter',
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('UnavailableDate', unavailableDatesSchema);
