const mongoose = require('mongoose');
const Booking = require('../model/Booking');
const User = require('../model/User');
const axios = require('axios');

module.exports = {
  getRequestedSittingJobs: async (req, res) => {},
  getConfirmedSittingJobs: async (req, res) => {},
  getCompletedSittingJobs: async (req, res) => {},
  getCancelledSittingJobs: async (req, res) => {},

  getRequestedSittingService: async (req, res) => {
    const userId = req.headers['authorization'];

    const allRecord = Booking.find({ owner: userId });

    console.log({ allRecord });
  },
  getConfirmedSittingService: async (req, res) => {},
  getCompletedSittingService: async (req, res) => {},
  getCancelledSittingService: async (req, res) => {},
};
