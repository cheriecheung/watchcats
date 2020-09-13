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

  sendRequest: async (req, res) => {
    const ownerId = req.headers['authorization'];
    const { sitterId, type } = req.body;

    const sitterRecord = await User.findOne({ urlId: sitterId });
    if (!sitterRecord) return res.status(404).json('Sitter not found');

    const ownerObjId = mongoose.Types.ObjectId(ownerId);
    const sitterObjId = sitterRecord._id;

    //location

    if (type === 'oneDay') {
      const { date, startTime, endTime, price } = req.body;

      const newBooking = new Booking({
        owner: ownerObjId,
        sitter: sitterObjId,
        date,
        startTime,
        endTime,
        price,
        status: 'requested',
      });

      await newBooking.save((err) => {
        if (err) {
          console.log({ err });
        }
        return res.status(201).json('Booking request successfully created');
      });
    }

    // await newBooking.save((err) => {
    //   if (err) {
    //     console.log({ err });
    //   }
    //   return res.status(201).json('Booking request successfully created');
    // });
  },
};
