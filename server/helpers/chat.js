const User = require('../model/User');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getPartificpantsInfo: async (conversations, senderId) => {
    const chatList = await Promise.all(
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

    return { chatList }
  }
}