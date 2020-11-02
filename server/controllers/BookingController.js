const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');
const Booking = require('../model/Booking');
const User = require('../model/User');

const cleanRecordData = async (item, bookingType) => {
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
  getAppointmentTime: async (req, res) => {
    const userId = req.headers['authorization'];

    // const userRecord = await User.findById(userId);
    // const {owner} = userRecord

    // if (owner) return res.status(404).json('no_owner_profile');
    User.findById(userId)
      .populate('owner')
      .exec(async (err, user) => {
        if (err) return err;

        const ownerIdObj = user.owner;

        if (!ownerIdObj) return res.status(404).json('OWNER_PROFILE_NOT_FOUND');

        const oneDayRecords = await AppointmentOneDay.find({
          owner: ownerIdObj,
        });
        const overnightRecords = await AppointmentOvernight.find({
          owner: ownerIdObj,
        });

        if ((oneDayRecords.length === 0) & (overnightRecords.length === 0)) {
          return res.status(404).json('APPOINTMENT_TIME_NOT_FOUND');
        }

        const allOneDays = oneDayRecords.map(({ id, date, startTime, endTime }) => ({
          id,
          date,
          startTime,
          endTime,
        }));
        const allOvernight = overnightRecords.map(({ id, startDate, endDate }) => ({
          id,
          startDate,
          endDate,
        }));

        return res.status(200).json({ allOneDays, allOvernight });
      });
  },

  sendRequest: async (req, res) => {
    const ownerUserId = req.headers['authorization'];

    const { sitterId: sitterShortId, type } = req.body;

    const [{ owner: ownerObjId, postcode }, { sitter: sitterObjId }] = await Promise.all([
      User.findById(ownerUserId),
      User.findOne({ urlId: sitterShortId }),
    ]);

    if (!ownerObjId || !sitterObjId)
      return res.status(404).json('Unable to identity sitter or owner profile.');

    //location

    if (type === 'oneDay') {
      const { date, startTime, endTime, price } = req.body;

      const newBooking = new Booking({
        owner: ownerObjId,
        sitter: sitterObjId,
        appointmentType: type,
        date,
        startTime,
        endTime,
        location: postcode,
        price,
        status: 'requested',
      });

      try {
        await newBooking.save();
        return res.status(201).json('Booking request successfully created');
      } catch (e) {
        console.log({ e });
      }
    }

    if (type === 'overnight') {
      const { startDate, endDate, price } = req.body;

      const newBooking = new Booking({
        owner: ownerObjId,
        sitter: sitterObjId,
        appointmentType: type,
        startDate,
        endDate,
        location: postcode,
        price,
        status: 'requested',
      });

      try {
        await newBooking.save();
        return res.status(201).json('Booking request successfully created');
      } catch (e) {
        console.log({ e });
      }
    }
  },

  getRecords: async (req, res) => {
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
      // console.log({ response })

      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },

  fulfillAction: async (req, res) => {
    const { action } = req.body

    console.log({ action })

    return res.status(200).json('success')
  }
};
