const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const User = require('../model/User');

module.exports = {
  getChatList: async (req, res) => {
    console.log('going to chatlist')
  },

  getChatConversation: async (req, res) => {
    const { userId: senderObjId } = req.verifiedData
    if (!senderObjId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    // const user = await User.findById(senderUserId);
    // if (!user) return res.status(400).json('ERROR/USER_NOT_FOUND')

    const { recipient } = req.query;

    const { _id: recipientObjId } = await User.findOne({ urlId: recipient })
    if (!recipientObjId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    console.log({ recipientObjId, senderObjId })

    try {
      // query everything in one go

      const conversation = await Conversation.findOne({
        participant1: [recipientObjId, senderObjId],
        participant2: [recipientObjId, senderObjId],
      });

      // const conversation = await Conversation.findOne({
      //   $or: [
      //     { $and: [{ participant1: senderUserId }, { participant2: recipientUserId }] },
      //     { $and: [{ participant1: recipientUserId }, { participant2: senderUserId }] },
      //   ],
      // })

      if (!conversation) return res.status(404).json('ERROR/CONVERSATION_NOT_FOUND')

      console.log({ conversation })

      // populate exec
      const messages = await Message.find({ conversation: conversation._id })
      if (!messages) return res.status(404).json('ERROR/MESSAGES_NOT_FOUND')

      return res.status(200).json({
        conversationInfo: { ...conversation._doc, sender: senderObjId },
        messages
      })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  }
}