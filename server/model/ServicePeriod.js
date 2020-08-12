const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicePeriodSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  type: {
    type: String, // one time or overnight period?
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

module.exports = mongoose.model('ServicePeriod', servicePeriodSchema);
