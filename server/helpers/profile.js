const Booking = require('../model/Booking');
const Review = require('../model/Review');

module.exports = {
  getProfileStats: async (type, id) => {
    const filter = type === 'sitter' ? 'owner' : 'sitter'

    const [
      totalReviews,
      totalCompletedBookings,
      repeatedCustomers
    ] = await Promise.all([
      Review.countDocuments({ reviewee: id }),
      Booking.countDocuments({ [type]: id, status: 'completed' }),
      Booking.aggregate([
        { $match: { [type]: id, status: 'completed' } },
        { $unwind: `$${filter}` },
        { $group: { _id: `$${filter}`, TotalBookingsFromCustomer: { $sum: 1 }, } },
        { $match: { TotalBookingsFromCustomer: { $gt: 1 } } },
      ])
    ]);
    // if none of the above result in undefined?

    const totalRepeatedCustomers = repeatedCustomers.length;

    return {
      totalReviews,
      totalCompletedBookings,
      totalRepeatedCustomers
    }
  }
}