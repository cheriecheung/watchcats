const UnavailableDate = require('../model/UnavailableDate');

const getUnavailableDates = async (sitterObjectId) => {
  return await UnavailableDate.find({
    sitter: sitterObjectId,
  }).then((response) => {
    return response.map(({ date }) => date);
  });
};

module.exports = { getUnavailableDates };
