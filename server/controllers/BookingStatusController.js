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

      // const sitterObjId = userRecord.sitter
      // const { status } = req.query;

      // const bookingRecords = await Booking.find({ sitter: sitterObjId });

      // if (bookingRecords.length > 0) {
      //   response = await Promise.all(
      //     bookingRecords.map(async (item) => {
      //       return cleanRecordData(item, 'sitting_jobs');
      //     })
      //   );
      // }

      const testRecords = [
        { id: 1, name: '#1', status: 'requested' },
        { id: 2, name: '#2', status: 'confirmed' },
        { id: 3, name: '#3', status: 'confirmed' },
        { id: 4, name: '#4', status: 'completed' },
        { id: 5, name: '#5', status: 'completed' },
        { id: 6, name: '#6', status: 'completed' },
        { id: 7, name: '#7', status: 'declined' },
        { id: 8, name: '#8', status: 'declined' },
        { id: 9, name: '#9', status: 'declined' },
        { id: 10, name: '#10', status: 'declined' },
      ]

      const response = testRecords.reduce((output, record) => {
        const { status } = record;

        if (status === 'requested') {
          output.requested.push(status)
        }
        if (status === 'confirmed') {
          output.confirmed.push(status)
        }
        if (status === 'completed') {
          output.completed.push(status)
        }
        if (status === 'declined') {
          output.declined.push(status)
        }

        return output
      }, { requested: [], confirmed: [], completed: [], declined: [] });

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

      // if (bookingRecords.length > 0) {
      //   response = await Promise.all(
      //     bookingRecords.map(async (item) => {
      //       return cleanRecordData(item, 'sitting_service');
      //     })
      //   );
      // }

      const testRecords = [
        { id: 1, name: '#1', status: 'declined' },
        { id: 2, name: '#2', status: 'completed' },
        { id: 3, name: '#3', status: 'completed' },
        { id: 4, name: '#4', status: 'confirmed' },
        { id: 5, name: '#5', status: 'confirmed' },
        { id: 6, name: '#6', status: 'confirmed' },
        { id: 7, name: '#7', status: 'requested' },
        { id: 8, name: '#8', status: 'requested' },
        { id: 9, name: '#9', status: 'requested' },
        { id: 10, name: '#10', status: 'requested' },
      ]

      const response = testRecords.reduce((output, record) => {
        const { status } = record;

        if (status === 'requested') {
          output.requested.push(status)
        }
        if (status === 'confirmed') {
          output.confirmed.push(status)
        }
        if (status === 'completed') {
          output.completed.push(status)
        }
        if (status === 'declined') {
          output.declined.push(status)
        }

        return output
      }, { requested: [], confirmed: [], completed: [], declined: [] });

      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },
}