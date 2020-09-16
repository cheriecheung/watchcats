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
  getRequestedSittingJobs: async (req, res) => {
    const userId = req.headers['authorization'];

    const { sitter: sitterObjId } = await User.findById(userId);
    if (!sitterObjId) return res.status(200).json([]);

    const bookingRecords = await Booking.find({ sitter: sitterObjId, status: 'requested' });
    let response = [];

    if (bookingRecords.length > 0) {
      response = await Promise.all(
        bookingRecords.map(async (item) => {
          return cleanRecordData(item, 'sitting_jobs');
        })
      );
    }

    return res.status(200).json(response);
  },
  getConfirmedSittingJobs: async (req, res) => {},
  getCompletedSittingJobs: async (req, res) => {},
  getDeclinedSittingJobs: async (req, res) => {},

  getRequestedSittingService: async (req, res) => {
    const userId = req.headers['authorization'];

    const { owner: ownerObjId } = await User.findById(userId);
    if (!ownerObjId) return res.status(204).json([]);

    const bookingRecords = await Booking.find({ owner: ownerObjId, status: 'requested' });
    let response = [];

    if (bookingRecords.length > 0) {
      response = await Promise.all(
        bookingRecords.map(async (item) => {
          return cleanRecordData(item, 'sitting_service');
        })
      );
    }

    return res.status(200).json(response);
  },
  getConfirmedSittingService: async (req, res) => {},
  getCompletedSittingService: async (req, res) => {},
  getDeclinedSittingService: async (req, res) => {},
};
