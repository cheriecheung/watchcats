const User = require('../model/User');
const Sitter = require('../model/Sitter');
const Booking = require('../model/Booking');
const Review = require('../model/Review');
const UnavailableDate = require('../model/UnavailableDate');

const ObjectId = require('mongodb').ObjectID;

async function getInfo(records) {
  return await Promise.all(
    records.map(async ({ id, urlId, aboutSitter, hourlyRate, nightlyRate }) => {
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
        { $group: { _id: '$owner', TotalBookingsFromCustomer: { $sum: 1 }, } },
        { $match: { TotalBookingsFromCustomer: { $gt: 1 } } },
      ]);

      const totalRepeatedCustomers = customers.length;

      return {
        firstName, lastName, profilePictureFileName,
        totalReviews, totalCompletedBookings, totalRepeatedCustomers,
        urlId, aboutSitter, hourlyRate, nightlyRate
      };
    })
  );
}

function paginateRecords(records, currentPage, nPerPage) {
  const start = nPerPage * (currentPage - 1)
  return records.slice(start, start + nPerPage)
}

module.exports = {
  getAllSitters: async (req, res) => {
    const { sort: sortType = 'totalReviews' } = req.query;
    const { currentPage = 1, nPerPage = 3 } = req.body;

    try {
      let completeRecords = []

      // totalReviews / totalCompletedBookings / totalRepeatedCustomers
      if (sortType.includes('total')) {
        const allSitterRecords = await Sitter.find()
        const cleaned = await getInfo(allSitterRecords)

        const sorted = await cleaned.sort((a, b) =>
          sortType.includes('Reviews') ? b[sortType] - a[sortType] : a[sortType] - b[sortType]
        )

        completeRecords = paginateRecords(sorted, currentPage, nPerPage)
      }

      // hourlyRate / nightly
      if (sortType.includes('Rate')) {
        const sortedAndPaginated = await Sitter.find()
          .sort({ [sortType]: 1 })
          .skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
          .limit(nPerPage);

        completeRecords = await getInfo(sortedAndPaginated)
      }

      console.log({ completeRecords })

      return res.status(200).json(completeRecords);
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
