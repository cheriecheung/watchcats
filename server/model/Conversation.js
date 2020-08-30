const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  participant1: {
    type: Schema.Types.ObjectId,
  },
  participant2: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
