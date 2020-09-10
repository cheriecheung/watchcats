const mongoose = require('mongoose');
const Booking = require('../model/Booking');
const User = require('../model/User');
const axios = require('axios');

module.exports = {
  sendRequest: async (req, res) => {
    const ownerId = req.headers['authorization'];

    const {
      sitterId,
      location,
      time: { startDate, endDate, startTime, endTime },
      price,
    } = req.body;

    const sitterRecord = await User.findOne({ urlId: sitterId });
    if (!sitterRecord) return res.status(404).json('Sitter not found');

    const ownerObjId = mongoose.Types.ObjectId(ownerId);
    const sitterObjId = sitterRecord._id;

    console.log({ startDate });

    const newBooking = new Booking({
      owner: ownerObjId,
      sitter: sitterObjId,
      location,
      startDate,
      endDate,
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
  },
};
