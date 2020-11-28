const User = require('../model/User');
const Sitter = require('../model/Sitter');
const Booking = require('../model/Booking');
const Review = require('../model/Review');
const UnavailableDate = require('../model/UnavailableDate');

const ObjectId = require('mongodb').ObjectID;

async function getInfo(records) {
  return await Promise.all(
    records.map(async (user) => {
      const {
        urlId,
        coordinates,
        // location,
        firstName, lastName,
        profilePictureFileName,
        sitter: sitterObjId
      } = user;

      const [sitterRecord, totalReviews, totalCompletedBookings, repeatedCustomers] = await Promise.all([
        Sitter.findById(sitterObjId),
        Review.countDocuments({ reviewee: sitterObjId }),
        Booking.countDocuments({ sitter: sitterObjId, status: 'completed' }),
        Booking.aggregate([
          { $match: { sitter: sitterObjId, status: 'completed' } },
          { $unwind: '$owner' },
          { $group: { _id: '$owner', TotalBookingsFromCustomer: { $sum: 1 }, } },
          { $match: { TotalBookingsFromCustomer: { $gt: 1 } } },
        ])
      ]);

      // if none of the above result in undefined?
      const { aboutSitter, hourlyRate, nightlyRate } = sitterRecord;
      const totalRepeatedCustomers = repeatedCustomers.length;

      return {
        urlId,
        coordinates,
        firstName,
        lastName,
        profilePictureFileName,
        aboutSitter,
        hourlyRate,
        nightlyRate,
        totalReviews,
        totalCompletedBookings,
        totalRepeatedCustomers,
      };
    })
  );
}

function paginate(records, page, nPerPage) {
  const start = nPerPage * (page - 1)
  return records.slice(start, start + nPerPage)
}

module.exports = {
  getCatSittersInBounds: async (req, res) => {
    const {
      sort: sortType = 'totalReviews',
      page,
      startDate,
      endDate
    } = req.query;

    try {
      const neLat = parseFloat(req.query.neLat);
      const neLng = parseFloat(req.query.neLng);
      const swLat = parseFloat(req.query.swLat);
      const swLng = parseFloat(req.query.swLng);

      console.log({ neLat, neLng, swLat, swLng, page, sortType, startDate, endDate })

      const inBounds = await User.find({
        firstName: { $exists: true },
        lastName: { $exists: true },
        sitter: { $exists: true },
        coordinates: {
          $geoWithin: {
            $box: [
              [swLng, swLat],
              [neLng, neLat]
            ]
          }
        }
      })

      const totalResults = inBounds.length

      const cleaned = await getInfo(inBounds)
      let sorted = []

      // totalReviews / totalCompletedBookings / totalRepeatedCustomers
      if (sortType.includes('total')) {
        sorted = cleaned.sort((a, b) => b[sortType] - a[sortType])
      }

      // hourlyRate / nightlyRate
      if (sortType.includes('Rate')) {
        sorted = cleaned.sort((a, b) => a[sortType] - b[sortType])
      }

      const nPerPage = 10
      const paginatedResults = paginate(sorted, page, nPerPage)

      return res.status(200).json({ totalResults, paginatedResults });
    } catch (err) {
      console.log({ err });
      return res.status(404).json('No records found');
    }
  },

  // filterByDate: async (req, res) => {
  //   const {
  //     currentPage = 2,
  //     nPerPage = 2,
  //     startDate = '2020-10-10',
  //     endDate = '2020-10-15',
  //   } = req.body;

  //   const startDateObj = new Date(startDate);
  //   const endDateObj = new Date(endDate);

  //   try {
  //     const recordsInPage = await Sitter.find()
  //       .skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
  //       .limit(nPerPage);

  //     const recordsAvailable = await Promise.all(
  //       recordsInPage.map(async ({ id, ...rest }) => {
  //         const sitterObjId = ObjectId(id);
  //         const { _doc } = rest;

  //         const unavailability = await UnavailableDate.find({ sitter: sitterObjId });

  //         const arr = unavailability.map(({ date }) => {
  //           if (startDateObj <= date && endDateObj >= date) {
  //             return 'unavailable';
  //           } else {
  //             return 'available';
  //           }
  //         });

  //         if (arr.includes('unavailable')) {
  //           return;
  //         } else {
  //           return _doc;
  //         }
  //       })
  //     );

  //     const filteredRecords = recordsAvailable.filter((item) => !!item);

  //     return res.status(200).json(filteredRecords);
  //   } catch (err) {
  //     console.log({ err });
  //     return res.status(404).json('No records found');
  //   }
  // },
};
