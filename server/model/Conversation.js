const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  },
  participant1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participant2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('Conversation', conversationSchema);
