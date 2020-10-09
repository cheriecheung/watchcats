const mongoose = require('mongoose');
const User = require('../model/User');
const Sitter = require('../model/Sitter');
const Booking = require('../model/Booking');
const Review = require('../model/Review');
const UnavailableDate = require('../model/UnavailableDate');

const ObjectId = require('mongodb').ObjectID;

async function getCompleteInfoRecord(records) {
  return await Promise.all(
    records.map(async ({ id, urlId, aboutSitter, priceOneDay, priceOvernight }) => {
      const sitterObjId = ObjectId(id);

      const userRecord = await User.findOne({ sitter: sitterObjId })
      const { firstName, lastName, profilePictureFileName } = userRecord;

      const [totalReviews, totalCompletedBookings] = await Promise.all([
        Review.countDocuments({ reviewee: id }),
        Booking.countDocuments({ sitter: id, status: 'completed' }),
      ]);

      // if (!totalReviews || !totalCompletedBookings)

      const customers = await Booking.aggregate([
        { $match: { sitter: sitterObjId, status: 'completed' } },
        { $unwind: '$owner' },
        { $group: { _id: '$owner', TotalBookingsFromCustomer: { $sum: 1 } } },
        { $match: { TotalBookingsFromCustomer: { $gt: 1 } } },
      ]);

      const totalRepeatedCustomers = customers.length;

      return {
        firstName, lastName, profilePictureFileName,
        totalReviews, totalCompletedBookings, totalRepeatedCustomers,
        urlId, aboutSitter, priceOneDay, priceOvernight
      };
    })
  );
}

module.exports = {
  getAllSitters: async (req, res) => {
    const { sort: sortType } = req.query;
    const { currentPage = 1, nPerPage = 3 } = req.body;
    console.log({ sortType })

    try {
      // 1. sort all records first

      // 2. display records in specific page

      let paginatedRecords = [];

      if (sortType === 'hourlyRate') {
        paginatedRecords = await Sitter.find().sort({ priceOneDay: 1 }).skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
          .limit(nPerPage);
      }

      if (sortType === 'nightlyRate') {
        paginatedRecords = await Sitter.find().sort({ priceOvernight: 1 }).skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
          .limit(nPerPage);
      }

      const completeDataRecords = await getCompleteInfoRecord(paginatedRecords)

      return res.status(200).json(completeDataRecords);
    } catch (err) {
      console.log({ err });
      return res.status(404).json('No records found');
    }
  },

  filterByAddress: async (req, res) => {
    console.log('filtering by address');
  },

  filterByDate: async (req, res) => {
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

  sortByHourlyRate: async (req, res) => {
    console.log('Sorting now by hourly rate');
  },
};
