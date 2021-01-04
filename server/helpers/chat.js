const Message = require('../model/Message');
const User = require('../model/User');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getPartificpantsInfo: async (conversations, senderId) => {
    const chatList = await Promise.all(
      conversations.map(async (item) => {
        const {
          _id: conversationId,
          lastMessage,
          participant1,
          participant2,
          updatedAt,
        } = item

        const [user1, user2, message] = await Promise.all([
          User.findById(participant1),
          User.findById(participant2),
          Message.findById(lastMessage)
        ]);
        console.log({ user1, user2, message, lastMessage })
        if (!user1 || !user2 || !message) return { err: 'Cannot find user(s) or message' }

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
          lastMessage: message.content,
          lastMessageDate: updatedAt,
          recipient
        }
      })
    )

    return { chatList }
  }
}