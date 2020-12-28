const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const Owner = require('../model/Owner');
const Sitter = require('../model/Sitter');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectID;

async function getPartificpantsInfo(conversations, senderId) {
  const totalChats = await Promise.all(
    conversations.map(async (item) => {
      const {
        _id: conversationId,
        lastMessage,
        lastMessageDate,
        participant1,
        participant2
      } = item

      const [user1, user2] = await Promise.all([
        User.findById(participant1),
        User.findById(participant2),
      ]);
      if (!user1 || !user2) return { err: 'Cannot find user(s)' }

      const recipientObj = user1._id.equals(ObjectId(senderId)) ? user2 : user1

      const {
        _id: recipientId,
        firstName,
        lastName,
        profilePicture,
        urlId
      } = recipientObj

      const recipient = {
        id: recipientId,
        firstName,
        lastName,
        profilePicture,
        shortId: urlId
      }

      return {
        id: conversationId,
        lastMessage,
        lastMessageDate,
        recipient
      }
    })
  )

  return { totalChats }
}

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

      const { totalChats, err } = await getPartificpantsInfo(sorted, senderId)
      if (err) return res.status(400).json('ERROR/ERROR_OCCURED')
      chatList = totalChats

      // const recipientShortId = chatList[0].recipient.shortId

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

      // const conversation = await Conversation.findOne({
      //   $or: [
      //     { $and: [{ participant1: senderUserId }, { participant2: recipientUserId }] },
      //     { $and: [{ participant1: recipientUserId }, { participant2: senderUserId }] },
      //   ],
      // })

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