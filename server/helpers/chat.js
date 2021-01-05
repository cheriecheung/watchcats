const Conversation = require('../model/Conversation');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  populateChatList: async (senderId) => {
    const populatedList = await Conversation
      .find({
        $or: [
          { participant1: senderId },
          { participant2: senderId }
        ]
      })
      .sort({ updatedAt: -1 })
      .populate([{
        path: 'participant1',
        select: ['firstName', 'lastName'],
        match: { _id: { $ne: ObjectId(senderId) } }
      },
      {
        path: 'participant2',
        select: ['firstName', 'lastName', 'profilePicture', 'urlId'],
        match: { _id: { $ne: ObjectId(senderId) } },
        rename: { "participant2": "recipient" }
      },
      {
        path: 'lastMessage',
        select: ['content', 'isReadByRecipient'],
      }
      ])

    return { populatedList }
  }
}