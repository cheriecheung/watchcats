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

// function inBounds(point, bounds) {
//   console.log({ point, bounds })
//   const eastBound = point.lng < bounds.neLng;
//   const westBound = point.lng > bounds.swLng;

//   let inLong;

//   if (bounds.neLng < bounds.swLng) {
//     inLong = eastBound || westBound;
//   } else {  
//     inLong = eastBound && westBound;
//   }

//   const inLat = point.lat > bounds.swLat && point.lat < bounds.neLat;
//   return inLat && inLong;
// }

function inBounds(point, bounds) {
  console.log({ point, bounds })

  var lng = (point.lng - bounds.neLng) * (point.lng - bounds.swLng) < 0;
  var lat = (point.lat - bounds.neLat) * (point.lat - bounds.swLat) < 0;
  return lng && lat;
}

module.exports = {
  getAllSitters: async (req, res) => {
    const { sort: sortType = 'totalReviews' } = req.query;
    const { currentPage = 1, nPerPage = 3 } = req.body;

    try {
      console.log({ query: req.query })


      const point = { lng: 52.365051, lat: 4.884429 }

      const neLat = parseFloat(req.query.neLat);
      const neLng = parseFloat(req.query.neLng);
      const swLat = parseFloat(req.query.swLat);
      const swLng = parseFloat(req.query.swLng);

      const bounds = { neLat, neLng, swLat, swLng }

      const isInBound = inBounds(point, bounds);

      console.log({ isInBound })

      return res.status(200).json([
        { lat: 52.3752899891, lng: 4.90782887337 },
        { lat: 52.4045, lng: 4.9385 }
      ]);

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

      // console.log({ completeRecords })

      // return res.status(200).json(completeRecords);
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
