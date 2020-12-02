const ObjectId = require('mongodb').ObjectID;
const Booking = require('../model/Booking');
const User = require('../model/User');

module.exports = {
  cleanRecordData: async (item, bookingType) => {
    const { id, appointmentType, owner, sitter, location, price, status, hasPaid } = item;
    const query = bookingType === 'jobs' ? { owner } : { sitter };
    const { firstName, lastName, urlId } = await User.findOne(query);

    const data = {
      id,
      firstName,
      lastName,
      shortId: urlId,
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
