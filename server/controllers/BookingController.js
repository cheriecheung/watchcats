const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');
const Booking = require('../model/Booking');
const User = require('../model/User');
const { sendTwilioSMS } = require('../helpers/sms')
const { sendNewBookingMail, sendUpdatedBookingMail } = require('../helpers/mailer')

const cleanRecordData = async (item, bookingType) => {
  const { id, appointmentType, owner, sitter, location, price, status, hasPaid } = item;
  const query = bookingType === 'jobs' ? { owner } : { sitter };
  const { firstName, lastName, urlId } = await User.findOne(query);

  const data = {
    id,
    firstName,
    lastName,
    shortId: urlId,
    appointmentType,
    location,
    price,
    status,
    hasPaid
  }

  if (appointmentType === 'oneDay') {
    const { date, startTime, endTime } = item;

    return { date, startTime, endTime, ...data };
  } else {
    const { startDate, endDate } = item;

    return { startDate, endDate, ...data };
  }
};

const getNewBookingStatus = (action) => {
  switch (action) {
    case 'decline':
      return { status: 'declined', description: 'BOOKING_DECLINED' }
    case 'accept':
      return { status: 'confirmed', description: 'BOOKING_ACCEPTED' }
    case 'complete':
      return { status: 'completed', description: 'BOOKING_COMPLETED' }
    default:
      throw new Error("Unable to get new booking status");
  }
}

module.exports = {
  getAppointmentTime: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    // const userRecord = await User.findById(userId);
    // const {owner} = userRecord

    // if (owner) return res.status(404).json('no_owner_profile');
    User.findById(userId)
      .populate('owner')
      .exec(async (err, user) => {
        if (err) return err;

        const ownerIdObj = user.owner;

        if (!ownerIdObj) return res.status(200).json('OWNER_PROFILE_NOT_FOUND');

        const oneDayRecords = await AppointmentOneDay.find({
          owner: ownerIdObj,
        });
        const overnightRecords = await AppointmentOvernight.find({
          owner: ownerIdObj,
        });

        if ((oneDayRecords.length === 0) & (overnightRecords.length === 0)) {
          return res.status(200).json('APPOINTMENT_TIME_NOT_FOUND');
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
    const { userId: ownerUserId } = req.verifiedData
    if (!ownerUserId) return res.status(403).json('User id missing');

    const { sitterId: sitterShortId, type } = req.body;

    try {
      const [{ owner: ownerObjId, postcode, firstName, lastName }, { sitter: sitterObjId, phone, email }] = await Promise.all([
        User.findById(ownerUserId),
        User.findOne({ urlId: sitterShortId }),
      ]);

      if (!ownerObjId || !sitterObjId)
        return res.status(401).json('Unable to identity sitter or owner profile.');

      let newBooking;

      if (type === 'oneDay') {
        const { date, startTime, endTime, price } = req.body;

        newBooking = new Booking({
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
      }

      if (type === 'overnight') {
        const { startDate, endDate, price } = req.body;

        newBooking = new Booking({
          owner: ownerObjId,
          sitter: sitterObjId,
          appointmentType: type,
          startDate,
          endDate,
          location: postcode,
          price,
          status: 'requested',
        });
      }

      await newBooking.save();

      const ownerName = `${firstName} ${lastName}`

      if (phone && email) {
        sendTwilioSMS(phone, 'BOOKING_REQUESTED', { name: ownerName })
        sendNewBookingMail({ email, name: ownerName })
      }

      // +1 booking notification to sitter's notification document

      return res.status(201).json('Booking request successfully created');
    } catch (e) {
      console.log({ e });
      return res.status(401).json('Unable to create booking request');
    }
  },

  getRecords: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    // if requested / comfirmed booking is expired, change status to 'declined'

    try {
      const userRecord = await User.findById(userId);
      if (!userRecord) return res.status(403).json('User not found');

      const { type } = req.query;
      const { sitter: sitterObjId, owner: ownerObjId } = userRecord
      let bookingRecords, filter;

      if (type === 'jobs') {
        if (!sitterObjId) return res.status(200).json([]);
        filter = { sitter: sitterObjId }
      } else {
        if (!ownerObjId) return res.status(200).json([]);
        filter = { owner: ownerObjId }
      }

      await Booking.update(filter, { $set: { isRead: true } }, { multi: true })

      bookingRecords = await Booking.find(filter);

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
      return res.status(200).json(response);
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Cannot get records');
    }
  },

  fulfillAction: async (req, res) => {
    const { id, action } = req.body

    try {
      const { status, description } = getNewBookingStatus(action)

      const bookingRecord = await Booking.findOneAndUpdate(
        { _id: id },
        { $set: { status } },
        { useFindAndModify: false }
      );
      if (!bookingRecord) return res.status(401).json('No booking record to update')

      const [{ phone, email }, { firstName, lastName }] = await Promise.all([
        User.findOne({ owner: bookingRecord.owner }),
        User.findOne({ sitter: bookingRecord.sitter })
      ]);

      if (!phone || !firstName || !lastName) {
        return res.status(401).json('Unable to find owner or sitter')
      }

      const sitterName = `${firstName} ${lastName}`

      sendTwilioSMS(phone, description, { name: sitterName })
      sendUpdatedBookingMail({ email, action, name: sitterName })

      // change notification of owner notification document

      return res.status(200).json('success')
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Unable to update')
    }
  }
};
