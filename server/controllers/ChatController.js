const Conversation = require('../model/Conversation');
const User = require('../model/User');

module.exports = {
  getChatList: async (req, res) => {
    console.log('going to chatlist')
  },

  getChatConversation: async (req, res) => {
    const { userId: senderUserId } = req.verifiedData
    if (!senderUserId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    // const user = await User.findById(senderUserId);
    // if (!user) return res.status(400).json('ERROR/USER_NOT_FOUND')

    const { recipient } = req.query;

    const { _id: recipientUserId } = await User.findOne({ urlId: recipient })
    if (!recipientUserId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    console.log({ recipientUserId, senderUserId })

    try {
      const conversation = await Conversation.findOne({
        $or: [
          { $and: [{ participant1: senderUserId }, { participant2: recipientUserId }] },
          { $and: [{ participant1: recipientUserId }, { participant2: senderUserId }] },
        ],
      })

    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  }
}