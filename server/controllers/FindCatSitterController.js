const Sitter = require('../model/Sitter');
const User = require('../model/User');
const { getProfileStats } = require('../helpers/profile')

async function getInfo(records) {
  return await Promise.all(
    records.map(async (user) => {
      const {
        urlId,
        coordinates,
        firstName, lastName,
        profilePicture,
        sitter: sitterObjId
      } = user;

      const [stats, sitter] = await Promise.all([
        getProfileStats('sitter', sitterObjId),
        Sitter.findById(sitterObjId)
      ])

      const {
        totalReviews,
        totalCompletedBookings,
        totalRepeatedCustomers
      } = stats

      const { aboutSitter, hourlyRate, nightlyRate } = sitter;

      return {
        urlId,
        coordinates,
        firstName,
        lastName,
        profilePicture,
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
      return res.status(404).json('ERROR/ERROR_OCCURED');
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
