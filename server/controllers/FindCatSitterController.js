const moment = require('moment');
const UnavailableDate = require('../model/UnavailableDate');
const User = require('../model/User');
const { getProfileStats } = require('../helpers/profile');

async function getCompleteInfo(records, startDate, endDate) {
  const isValidStartDate = moment(startDate, "YYYY-MM-DD", true).isValid();
  const isValidEndDate = moment(endDate, "YYYY-MM-DD", true).isValid();

  return await Promise.all(
    records.map(async ({ _doc: user }) => {
      const { sitter } = user;
      const { _id: sitterObjId } = sitter;

      if (isValidStartDate && isValidEndDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const unavailableDates = await UnavailableDate.find({ sitter: sitterObjId });

        if (unavailableDates && unavailableDates.length > 0) {
          const hasUnavailableDates = unavailableDates.filter(({ date }) => startDateObj <= date && endDateObj >= date);
          if (hasUnavailableDates.length > 0) return;
        }
      }

      const stats = await getProfileStats('sitter', sitterObjId)

      user.totalReviews = stats.totalReviews;
      user.totalCompletedBookings = stats.totalCompletedBookings;
      user.totalRepeatedCustomers = stats.totalRepeatedCustomers;

      return user;
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

      const inBounds = await User
        .find({
          firstName: { $exists: true },
          lastName: { $exists: true },
          sitter: { $exists: true },
          urlId: { $exists: true },
          coordinates: {
            $geoWithin: {
              $box: [
                [swLng, swLat],
                [neLng, neLat]
              ]
            }
          }
        })
        .select(['firstName', 'lastName', 'coordinates', 'profilePicture', 'urlId', 'sitter'])
        .populate({
          path: 'sitter',
          select: ['aboutSitter', 'hourlyRate', 'nightlyRate']
        })

      const totalResults = inBounds.length

      const cleaned = await getCompleteInfo(inBounds, startDate, endDate);
      let sorted = []

      // totalReviews / totalCompletedBookings / totalRepeatedCustomers
      if (sortType.includes('total')) {
        sorted = cleaned.sort((a, b) => b[sortType] - a[sortType])
      }

      // hourlyRate / nightlyRate
      if (sortType.includes('Rate')) {
        sorted = cleaned.sort((a, b) => a.sitter[sortType] - b.sitter[sortType])
      }

      const nPerPage = 10
      const paginatedResults = paginate(sorted, page, nPerPage)

      return res.status(200).json({ totalResults, paginatedResults });
    } catch (err) {
      console.log({ err });
      return res.status(404).json('ERROR/ERROR_OCCURED');
    }
  }
};
