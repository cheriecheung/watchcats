const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentOneDaySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  startTime: {
    type: Date,
    required: false,
  },
  endTime: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('AppointmentOneDay', appointmentOneDaySchema);
