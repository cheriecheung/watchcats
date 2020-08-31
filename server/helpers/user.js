const User = require('../model/User');
const mongoose = require('mongoose');
const Sitter = require('../model/Sitter');
const UnavailableDate = require('../model/UnavailableDate');

const getSitterData = async (sitterId) => {
  return await User.findOne({ urlId: sitterId })
    .populate('sitter')
    .exec(async (err, user) => {
      if (err) return err;

      const {
        sitter: {
          id: sitterId,
          aboutSitter,
          experience,
          hasCat,
          hasMedicationSkills,
          hasVolunteered,
          hasInjectionSkills,
          hasCertification,
          hasGroomingSkills,
          priceOneTime,
          priceOvernight,
          emergencyName,
          emergencyNumber,
        },
      } = user;

      let unavailableDates;

      const allDays = await UnavailableDate.find({
        sitter: mongoose.Types.ObjectId(sitterId),
      });

      if (allDays.length > 0) {
        unavailableDates = allDays.map(({ date }) => date);
      }

      return {
        aboutSitter,
        experience,
        hasCat,
        hasMedicationSkills,
        hasVolunteered,
        hasInjectionSkills,
        hasCertification,
        hasGroomingSkills,
        priceOneTime,
        priceOvernight,
        unavailableDates,
        emergencyName,
        emergencyNumber,
      };
    });
};

module.exports = { getSitterData };
