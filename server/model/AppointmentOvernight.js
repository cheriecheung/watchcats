const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentOvernightSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('AppointmentOvernight', appointmentOvernightSchema);
