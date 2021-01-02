const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const Owner = require('../model/Owner');
const Sitter = require('../model/Sitter');
const User = require('../model/User');
const { getPartificpantsInfo } = require('../helpers/chat')

module.exports = {
  getChatList: async (req, res) => {
    const { userId: senderId } = req.verifiedData
    if (!senderId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    try {
      const sorted = await Conversation.find({
        $or: [
          { participant1: senderId },
          { participant2: senderId }
        ]
      }).sort({ lastMessageDate: -1 })

      if (!sorted) return res.status(404).json('ERROR/ERROR_OCCURED')
      if (sorted.length === 0) return res.status(200).json({ chatList: [] })

      const { chatList, err } = await getPartificpantsInfo(sorted, senderId)
      if (err) return res.status(400).json('ERROR/ERROR_OCCURED')

      return res.status(200).json({ chatList })

      // `/messages/${recipientShortId}` automatically redirects to
      // https://watchcats.nl/messages/:recipientShortId
      // return res.redirect(`/messages/${recipientShortId}`);
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  },

  getChatConversation: async (req, res) => {
    const { userId: senderObjId } = req.verifiedData
    if (!senderObjId) return res.status(400).json('ERROR/USER_NOT_FOUND');

    // const user = await User.findById(senderUserId);
    // if (!user) return res.status(400).json('ERROR/USER_NOT_FOUND')

    const { recipient } = req.query;

    // const recipientUser = await User.findOne({ urlId: recipient })
    const [senderUser, recipientUser] = await Promise.all([
      User.findById(senderObjId),
      User.findOne({ urlId: recipient }),
    ]);
    if (!senderUser || !recipientUser) return res.status(400).json('ERROR/USER_NOT_FOUND');

    const { _id: recipientObjId } = recipientUser

    try {
      // query everything in one go
      // populate exec
      const conversation = await Conversation.findOne({
        participant1: [recipientObjId, senderObjId],
        participant2: [recipientObjId, senderObjId],
      });

      const {
        profilePicture: senderPicture
      } = senderUser

      const sender = {
        id: senderObjId,
        profilePicture: senderPicture
      }

      const {
        firstName,
        lastName,
        profilePicture: recipientPicture,
        urlId,
        sitter,
        owner
      } = recipientUser

      const [sitterProfile, ownerProfile] = await Promise.all([
        Sitter.findById(sitter),
        Owner.findById(owner),
      ]);

      const recipient = {
        firstName,
        lastName,
        profilePicture: recipientPicture,
        shortId: urlId,
        hasSitterProfile: sitterProfile ? true : false,
        hasOwnerProfile: ownerProfile ? true : false,
      }

      if (!conversation) return res.status(200).json({
        conversationInfo: { sender, recipient }
      })

      const messages = await Message.find({ conversation: conversation._id })
      if (!messages) return res.status(404).json('ERROR/MESSAGES_NOT_FOUND')

      return res.status(200).json({
        conversationInfo: { sender, recipient },
        messages
      })
    } catch (err) {
      console.log({ err })
      return res.status(400).json('ERROR/ERROR_OCCURED')
    }
  }
}