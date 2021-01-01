const ObjectId = require('mongodb').ObjectID;
const Booking = require('../model/Booking');
const Conversation = require('../model/Conversation');
const Message = require('../model/Message');
const User = require('../model/User');

function generateMessageType(status) {
  switch (status) {
    case 'request':
      return { message: 'AUTOMATED_MESSAGE/BOOKING_REQUESTED' }
    case 'accept':
      return { message: 'AUTOMATED_MESSAGE/BOOKING_CONFIRMED' }
    case 'decline':
      return { message: 'AUTOMATED_MESSAGE/BOOKING_DECLINED' }
    case 'complete':
      return { message: 'AUTOMATED_MESSAGE/BOOKING_COMPLETED' }
    default:
      throw new Error("Unable to generate automated message");
  }
}

module.exports = {
  createAutomatedMessage: async ({ booking, bookingAction, senderId, recipientId }) => {
    const { message } = generateMessageType(bookingAction)
    if (!message) return { ok: false, err: 'Unable to generate automated message' }

    const conversation = await Conversation.findOne({
      participant1: [recipientId, senderId],
      participant2: [recipientId, senderId],
    });

    if (!conversation) {
      const newConversation = new Conversation({
        lastMessage: message,
        lastMessageDate: Date.now(),
        participant1: recipientId,
        participant2: senderId,
      });

      await newConversation.save();

      const newMessage = new Message({
        booking,
        content: message,
        conversation: newConversation._id,
        sender: senderId,
      });

      await newMessage.save();

      return { ok: true };
    }

    conversation.lastMessage = message;
    conversation.lastMessageDate = Date.now();
    await conversation.save();

    const newMessage = new Message({
      booking,
      content: message,
      conversation: conversation._id,
      sender: senderId
    });

    await newMessage.save();

    return { ok: true };
  },

  cleanRecordData: async (item, bookingType) => {
    const { id, appointmentType, owner, sitter, location, price, status, hasPaid } = item;
    const query = bookingType === 'jobs' ? { owner } : { sitter };
    const { firstName, lastName, urlId, profilePicture } = await User.findOne(query);

    const data = {
      id,
      firstName,
      lastName,
      urlId,
      profilePicture,
      appointmentType,
      location,
      price,
      status,
      hasPaid
    }

    if (appointmentType === 'oneDay') {
      const { date, startTime, endTime } = item;

      return { date, startTime, endTime, ...data };
    } else {
      const { startDate, endDate } = item;

      return { startDate, endDate, ...data };
    }
  },

  getNewBookingStatus: (action) => {
    switch (action) {
      case 'decline':
        return { status: 'declined', description: 'BOOKING_DECLINED' }
      case 'accept':
        return { status: 'confirmed', description: 'BOOKING_ACCEPTED' }
      case 'complete':
        return { status: 'completed', description: 'BOOKING_COMPLETED' }
      default:
        throw new Error("Unable to get new booking status");
    }
  },

  getInfo: async (bookingId, reviewerUserId) => {
    const booking = await Booking.findById(bookingId)
    if (!booking) return { error: 'Booking record not found' }

    const participantsIds = [
      ObjectId(booking.owner).toString(),
      ObjectId(booking.sitter).toString()
    ];

    const reviewerUserRecord = await User.findById(reviewerUserId)
    if (!reviewerUserRecord) return { error: 'Reviewer\'s User record not found' }

    const reviewerIds = [
      ObjectId(reviewerUserRecord.owner).toString(),
      ObjectId(reviewerUserRecord.sitter).toString()
    ]

    const reviewer = participantsIds.find(id => reviewerIds.includes(id));
    const reviewee = participantsIds.find(id => id !== reviewer)

    const revieweeUserRecord = await User.findOne({
      $or: [{ owner: reviewee }, { sitter: reviewee }],
    })
    if (!revieweeUserRecord) return { error: 'Reviewee\'s user record not found' };

    return { booking, reviewer: reviewerUserRecord, reviewee: revieweeUserRecord }
  }
}
