const UnavailableDates = require('../model/UnavailableDates');

const getUnavailableDates = async (sitterObjectId) => {
  return await UnavailableDates.find({
    sitter: sitterObjectId,
  }).then((response) => {
    return response.map(({ date }) => date);
  });
};

module.exports = { getUnavailableDates };
