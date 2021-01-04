const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  participant1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  participant2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: false,
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);
