const mongoose = require('mongoose');
const User = require('../model/User');
const Sitter = require('../model/Sitter');
const Booking = require('../model/Booking');
const Review = require('../model/Review');
const UnavailableDate = require('../model/UnavailableDate');

const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getAllSitters: async (req, res) => {
    const { currentPage = 2, nPerPage = 2 } = req.body;

    try {
      const recordsInPage = await Sitter.find()
        .skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
        .limit(nPerPage);

      const updatedRecords = await Promise.all(
        recordsInPage.map(async ({ id, ...rest }) => {
          const sitterObjId = ObjectId(id);
          const { _doc } = rest;

          const [bookings, reviews] = await Promise.all([
            Booking.find({ sitter: sitterObjId, status: 'completed' }),
            Review.find({ reviewee: sitterObjId }),
          ]);

          const customers = await Booking.aggregate([
            { $match: { sitter: sitterObjId, status: 'completed' } },
            { $unwind: '$owner' },
            { $group: { _id: '$owner', TotalBookingsFromCustomer: { $sum: 1 } } },
            { $match: { TotalBookingsFromCustomer: { $gt: 1 } } },
          ]);

          const totalCompletedBookings = bookings.length;
          const totalReviews = reviews.length;
          const totalRepeatedCustomers = customers.length;

          return {
            totalCompletedBookings,
            totalReviews,
            totalRepeatedCustomers,
            ..._doc,
          };
        })
      );

      console.log({ updatedRecords });

      return res.status(200).json('Returning records in page');
    } catch (err) {
      console.log({ err });
      return res.status(404).json('No records found');
    }
  },

  searchByDate: async (req, res) => {
    const {
      currentPage = 2,
      nPerPage = 2,
      startDate = '2020-10-10',
      endDate = '2020-10-15',
    } = req.body;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    try {
      const recordsInPage = await Sitter.find()
        .skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
        .limit(nPerPage);

      const recordsAvailable = await Promise.all(
        recordsInPage.map(async ({ id, ...rest }) => {
          const sitterObjId = ObjectId(id);
          const { _doc } = rest;

          const unavailability = await UnavailableDate.find({ sitter: sitterObjId });

          const arr = unavailability.map(({ date }) => {
            if (startDateObj <= date && endDateObj >= date) {
              return 'unavailable';
            } else {
              return 'available';
            }
          });

          if (arr.includes('unavailable')) {
            return;
          } else {
            return _doc;
          }
        })
      );

      const filteredRecords = recordsAvailable.filter((item) => !!item);

      return res.status(200).json(filteredRecords);
    } catch (err) {
      console.log({ err });
      return res.status(404).json('No records found');
    }
  },
};
