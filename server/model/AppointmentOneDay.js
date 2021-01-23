const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentOneDaySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('AppointmentOneDay', appointmentOneDaySchema);
