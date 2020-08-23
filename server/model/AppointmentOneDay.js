const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentOneDaySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  startTime: {
    type: String,
    required: false,
  },
  endTime: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('AppointmentOneDay', appointmentOneDaySchema);
