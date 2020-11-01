const Booking = require('../model/Booking');
const User = require('../model/User');

const cleanRecordData = async (item, bookingType) => {
  const { id, appointmentType, owner, sitter, location, price } = item;
  const query = bookingType === 'sitting_jobs' ? { owner } : { sitter };
  const { firstName, lastName, urlId } = await User.findOne(query);

  if (appointmentType === 'oneDay') {
    const { date, startTime, endTime } = item;
    return {
      id,
      name: `${firstName} ${lastName}`,
      shortId: urlId,
      appointmentType,
      date,
      startTime,
      endTime,
      location,
      price,
    };
  } else {
    const { startDate, endDate } = item;
    return {
      id,
      name: `${firstName} ${lastName}`,
      shortId: urlId,
      appointmentType,
      startDate,
      endDate,
      location,
      price,
    };
  }
};

module.exports = {
  getSittingJobs: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(403).json('User not found');

      if (!userRecord.sitter) return res.status(200).json([]);

      const sitterObjId = userRecord.sitter
      const { status } = req.query;

      const bookingRecords = await Booking.find({ sitter: sitterObjId, status });

      let response = [];

      if (bookingRecords.length > 0) {
        response = await Promise.all(
          bookingRecords.map(async (item) => {
            return cleanRecordData(item, 'sitting_jobs');
          })
        );
      }

      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },

  getSittingService: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(403).json('User not found');

      if (!userRecord.owner) return res.status(200).json([]);

      const ownerObjId = userRecord.owner
      const { status } = req.query;

      const bookingRecords = await Booking.find({ owner: ownerObjId, status });

      let response = [];

      if (bookingRecords.length > 0) {
        response = await Promise.all(
          bookingRecords.map(async (item) => {
            return cleanRecordData(item, 'sitting_service');
          })
        );
      }

      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },
}