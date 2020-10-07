const mongoose = require('mongoose');
const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');
const Booking = require('../model/Booking');
const User = require('../model/User');
const axios = require('axios');

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

  sendBookingRequest: async (req, res) => {
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

  acceptBooking: async (req, res) => {
    console.log('accept booking');
  },

  declineBooking: async (req, res) => {
    console.log('decline booking');
  },

  completeBooking: async (req, res) => {
    console.log('complete booking');
  },
};
