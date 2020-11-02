const Booking = require('../model/Booking');
const User = require('../model/User');

const cleanRecordData = async (item, bookingType) => {
  console.log({ item })
  const { id, appointmentType, owner, sitter, location, price, status } = item;
  const query = bookingType === 'jobs' ? { owner } : { sitter };
  const { firstName, lastName, urlId } = await User.findOne(query);

  const data = {
    id,
    name: `${firstName} ${lastName}`,
    shortId: urlId,
    appointmentType,
    location,
    price,
    status
  }

  if (appointmentType === 'oneDay') {
    const { date, startTime, endTime } = item;

    return { date, startTime, endTime, ...data };
  } else {
    const { startDate, endDate } = item;

    return { startDate, endDate, ...data };
  }
};

module.exports = {
  getBookingRecords: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(403).json('User not found');

      const { type } = req.query;
      let bookingRecords;

      if (type === 'jobs') {
        if (!userRecord.sitter) return res.status(200).json([]);
        const sitterObjId = userRecord.sitter
        bookingRecords = await Booking.find({ sitter: sitterObjId });
      } else {
        if (!userRecord.owner) return res.status(200).json([]);
        const ownerObjId = userRecord.owner
        bookingRecords = await Booking.find({ owner: ownerObjId });
      }

      let response = { requested: [], confirmed: [], completed: [], declined: [] };

      if (bookingRecords.length > 0) {
        response = await Promise.all(
          bookingRecords
            .map(async (item) => {
              return cleanRecordData(item, type);
            })
        );

        response = response.reduce((output, record) => {
          const { status } = record;

          if (status === 'requested') {
            output.requested.push(record)
          }
          if (status === 'confirmed') {
            output.confirmed.push(record)
          }
          if (status === 'completed') {
            output.completed.push(record)
          }
          if (status === 'declined') {
            output.declined.push(record)
          }

          return output
        }, { requested: [], confirmed: [], completed: [], declined: [] });

      }
      console.log({ response })

      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },
}