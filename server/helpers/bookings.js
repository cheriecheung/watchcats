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
  getUnreadBookings: async (owner, sitter) => {
    const notifications = {
      hasUnreadBookings: false,
      hasUnreadChats: false
    }

    const unreadBookings = await Booking.find({
      $or: [
        { owner, isReadByOwner: false },
        { sitter, isReadBySitter: false }
      ]
    })

    if (unreadBookings.length > 0) {
      const allBookings = unreadBookings.reduce((output, item) => {
        const { owner: ownerId, sitter: sitterId, status } = item

        if (owner && owner.equals(ownerId)) {
          output.unreadAsOwner[status] = true;
        }

        if (sitter && sitter.equals(sitterId)) {
          output.unreadAsSitter[status] = true;
        }

        return output
      }, { unreadAsOwner: {}, unreadAsSitter: {} });

      notifications.hasUnreadBookings = true;
      notifications.unreadBookingsAsOwner = allBookings.unreadAsOwner;
      notifications.unreadBookingsAsSitter = allBookings.unreadAsSitter;
    }

    return { notifications }
  },

  createAutomatedMessage: async ({ bookingId, bookingAction, senderId, recipientId }) => {
    const { message } = generateMessageType(bookingAction)
    if (!message) return { ok: false, err: 'Unable to generate automated message' }

    const conversation = await Conversation.findOne({
      participant1: [recipientId, senderId],
      participant2: [recipientId, senderId],
    });

    if (conversation) {
      const newMessage = new Message({
        booking: bookingId,
        content: message,
        conversation: conversation._id,
        sender: senderId
      });
      await newMessage.save();

      conversation.lastMessage = newMessage._id;
      conversation.updatedAt = Date.now()
      await conversation.save();
    } else {
      const newMessage = new Message({
        booking: bookingId,
        content: message,
        sender: senderId,
      });
      await newMessage.save();

      const newConversation = new Conversation({
        lastMessage: newMessage._id,
        participant1: recipientId,
        participant2: senderId,
        updatedAt: Date.now()
      });
      await newConversation.save();

      newMessage.conversation = newConversation._id;
      await newMessage.save();
    }

    return { ok: true };
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

  getBookingInfo: async (userId, bookingId) => {
    const { owner, sitter } = await User
      .findById(userId)
      .select(['owner', 'sitter'])

    const bookingInfo = await Booking
      .findById(bookingId)
      .select(['appointmentType', 'startDate', 'endDate', 'date', 'startTime', 'endTime', 'location', 'price'])
      .populate({
        path: 'owner',
        select: ['user'],
        match: { _id: { $ne: owner } },
        populate: {
          path: 'user',
          select: ['firstName', 'lastName', 'profilePicture'],
        }
      })
      .populate({
        path: 'sitter',
        select: ['user'],
        match: { _id: { $ne: sitter } },
        populate: {
          path: 'user',
          select: ['firstName', 'lastName', 'profilePicture'],
        }
      })

    return { bookingInfo }
  }
}
