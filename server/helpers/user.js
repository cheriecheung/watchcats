const UnavailableDate = require('../model/UnavailableDate');
const axios = require('axios');
const { GOOGLE_MAP_KEY } = process.env

async function getCoordinatesByPostcode(postcode) {
  const postcodeNoSpace = postcode.replace(' ', '')
  const url = `https://maps.googleapis.com/maps/api/geocode/json?region=nl&address=${postcodeNoSpace}&key=${GOOGLE_MAP_KEY}`

  const { data: { results } } = await axios.get(url);

  if (Array.isArray(results) && results.length > 0) {
    const { geometry } = results[0];
    const { location } = geometry || {};

    return location;
  } else {
    return;
  }
}

async function getUnavailableDates(sitterObjectId) {
  return await UnavailableDate.find({
    sitter: sitterObjectId,
  }).then((response) => {
    return response.map(({ date }) => date);
  });
};

module.exports = { getCoordinatesByPostcode, getUnavailableDates };
