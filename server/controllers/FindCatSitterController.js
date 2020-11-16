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

function paginate(records, currentPage, nPerPage) {
  const start = nPerPage * (currentPage - 1)
  return records.slice(start, start + nPerPage)
}

module.exports = {
  getCatSittersInBounds: async (req, res) => {
    const {
      sort: sortType = 'totalReviews',
      //  currentPage = 1,
      nPerPage = 10,
    } = req.query;
    // const { currentPage = 1, nPerPage = 20 } = req.body;

    try {
      const currentPage = parseInt(req.query.currentPage);
      const neLat = parseFloat(req.query.neLat);
      const neLng = parseFloat(req.query.neLng);
      const swLat = parseFloat(req.query.swLat);
      const swLng = parseFloat(req.query.swLng);

      // console.log({ neLat, neLng, swLat, swLng, currentPage })

      const inBounds = await User.find({
        firstName: { $exists: true },
        lastName: { $exists: true },
        sitter: { $exists: true },
        // location: {
        coordinates: {
          $geoWithin: {
            $box: [
              [swLng, swLat],
              [neLng, neLat]
            ]
            // }
          }
        }
      })

      const totalResults = inBounds.length;
      let paginatedResults = []

      // totalReviews / totalCompletedBookings / totalRepeatedCustomers
      if (sortType.includes('total')) {
        const cleaned = await getInfo(inBounds)
        const sorted = cleaned.sort((a, b) => b[sortType] - a[sortType])

        paginatedResults = paginate(sorted, currentPage, nPerPage)
      }



      // ------------------------------ 00000000000000000 ------------------------------ /


      // let completeRecords = []

      // // totalReviews / totalCompletedBookings / totalRepeatedCustomers
      // if (sortType.includes('total')) {
      //   const allSitterRecords = await Sitter.find()
      //   const cleaned = await getInfo(allSitterRecords)
      //   const sorted = await cleaned.sort((a, b) => b[sortType] - a[sortType])

      //   completeRecords = paginateRecords(sorted, currentPage, nPerPage)
      // }

      // // hourlyRate / nightly
      // if (sortType.includes('Rate')) {
      //   const sortedAndPaginated = await Sitter.find()
      //     .sort({ [sortType]: 1 })
      //     .skip(currentPage > 0 ? (currentPage - 1) * nPerPage : 0)
      //     .limit(nPerPage);

      //   completeRecords = await getInfo(sortedAndPaginated)
      // }

      // send count (sitter record) to front end for the pagination numbers;
      // on front end, when clicked a pagination number, send it to back end
      // console.log({ paginatedResults })

      const data = {
        totalResults,
        paginatedResults,
      }

      console.log({
        totalResults,
      })

      return res.status(200).json(data);
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
};
