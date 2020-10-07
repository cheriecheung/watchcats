const mongoose = require('mongoose');
const User = require('../model/User');
const Sitter = require('../model/Sitter');
const Booking = require('../model/Booking');
const Review = require('../model/Review');

module.exports = {
  getAllSitters: async (req, res) => {
    const allSitterRecords = await Sitter.find();

    const updatedRecords = allSitterRecords.map(async ({ id }) => {
      const [allCompletedBookings, allReviews] = await Promise.all([
        Booking.find({ sitter: id, status: 'completed' }),
        Review.find({ reviewee: id }),
      ]);

      // console.log({ allCompletedBookings, allReviews });
    });

    const allRepeatedCustomers = await Booking.aggregate([
      { $unwind: '$owner' },
      { $group: { _id: '$owner', CustomerCount: { $sum: 1 } } },
      { $match: { CustomerCount: { $gt: 1 } } },
    ]);

    console.log({ allRepeatedCustomers });
  },
};
