const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const User = require('../model/User');
const { populateChatList } = require('../helpers/chat');

module.exports = {
  getChatList: async (req, res) => {
    const { userId: senderId } = req.verifiedData
    if (!senderId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    try {
      const { populatedList } = await populateChatList(senderId);
      if (!populatedList) return res.status(404).json('ERROR/ERROR_OCCURED')
      if (populatedList.length === 0) return res.status(200).json({ chatList: [] })

      return res.status(200).json({ chatList: populatedList })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  },

  getChatConversation: async (req, res) => {
    const { userId: senderId } = req.verifiedData
    if (!senderId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    const { recipient: recipientUrlId } = req.query;

    const [sender, recipient] = await Promise.all([
      User.findById(senderId)
        .select('profilePicture'),
      User.findOne({ urlId: recipientUrlId })
        .select(['firstName', 'lastName', 'profilePicture', 'urlId', 'sitter', 'owner'])
        .populate({ path: 'sitter', select: ['_id'] })
        .populate({ path: 'owner', select: ['_id'] })
    ]);
    if (!sender || !recipient) return res.status(400).json('ERROR/USER_NOT_FOUND');

    try {
      const conversation = await Conversation.findOne({
        participant1: [senderId, recipient._id],
        participant2: [senderId, recipient._id],
      });

      if (!conversation) return res.status(200).json({
        conversationInfo: { sender, recipient }
      })

      await Message.updateMany(
        {
          conversation: conversation._id,
          sender: recipient._id // sender = user i'm talking to
        },
        { isReadByRecipient: true } // = is read by me
      )

      const messages = await Message
        .find({ conversation: conversation._id })
        .sort({ createdAt: 1 })
        .populate([{
          path: 'booking',
          select: ['_id', 'owner', 'sitter', 'appointmentType', 'startDate', 'endDate', 'date', 'startTime', 'endTime', 'location', 'price', 'status'],
          populate: [
            {
              path: 'owner',
              select: ['user'],
              populate: {
                path: 'user',
                select: ['firstName', 'lastName']
              }
            },
            {
              path: 'sitter',
              select: ['user'],
              populate: {
                path: 'user',
                select: ['firstName', 'lastName']
              }
            }
          ]
        }
        ])
      if (!messages) return res.status(404).json('ERROR/MESSAGES_NOT_FOUND')

      // renew notifications

      const allConversations = await Conversation
        .find({
          $or: [
            { participant1: senderId },
            { participant2: senderId }
          ]
        })
        .select(['_id'])

      const allConversationsIds = allConversations.map(({ _id }) => _id)

      const unreadChats = await Message.find({
        conversation: { $in: allConversationsIds },
        sender: { $ne: senderId },
        isReadByRecipient: false
      }).select('_id')
        .populate([
          {
            path: 'conversation',
            select: ['_id']
          }
        ])

      const cleanedUnreadChats = unreadChats.map(({ conversation: { _id } }) => _id)

      return res.status(200).json({
        conversationInfo: { sender, recipient },
        messages,
        hasUnreadChats: unreadChats.length > 0,
        unreadChats: cleanedUnreadChats
      })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  }
}