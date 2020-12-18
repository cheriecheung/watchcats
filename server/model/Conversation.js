const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  lastMessage: {
    type: String,
  },
  lastMessageDate: {
    type: Date,
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
});

module.exports = mongoose.model('Conversation', conversationSchema);
