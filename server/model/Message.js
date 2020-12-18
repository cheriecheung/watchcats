const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    default: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    default: true
  },
  content: {
    type: String,
    default: true
  },
  isAutoMessage: {
    type: String,
    default: true
  },
  isRead: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
