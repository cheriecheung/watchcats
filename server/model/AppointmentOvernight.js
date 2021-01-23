const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentOvernightSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('AppointmentOvernight', appointmentOvernightSchema);
