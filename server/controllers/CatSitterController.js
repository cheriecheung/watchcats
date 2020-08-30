const mongoose = require('mongoose');
const User = require('../model/User');
const Sitter = require('../model/Sitter');
const UnavailableDate = require('../model/UnavailableDate');

module.exports = {
  get: async (req, res) => {
    const userId = req.headers['authorization'];
    // const user = await User.findById(userId);

    // if (user.sitter) {
    User.findById(userId)
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

        return res.status(200).json({
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
        });
      });
  },

  post: async (req, res) => {
    const userId = req.headers['authorization'];
    const user = await User.findById(userId);
    const {
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
      unavailableDates: unavailableDatesData,
      emergencyName,
      emergencyNumber,
    } = req.body;

    console.log({ unavailableDatesData });

    if (!user.sitter) {
      const newSitter = new Sitter({
        _id: new mongoose.Types.ObjectId(),
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
      });

      if (unavailableDatesData.length > 0) {
        unavailableDatesData.forEach((date) => {
          const newDate = new UnavailableDate({
            sitter: newSitter._id,
            date,
          });

          newDate.save();
        });
      }

      await newSitter.save((err) => {
        if (err) return err;
        user.sitter = newSitter._id;
        user.save();

        return res.status(201).json('Sitter profile successful created');
      });
    }

    if (user.sitter) {
      User.findById(userId)
        .populate('sitter')
        .exec(async (err, user) => {
          if (err) return err;

          const sitterIdObj = user.sitter;

          if (unavailableDatesData.length > 0) {
            const allDays = await UnavailableDate.find({
              sitter: sitterIdObj,
            });

            console.log({ allDays });

            unavailableDatesData.forEach((date, index) => {
              if (!allDays.includes(date)) {
                const newDate = new UnavailableDate({
                  sitter: sitterIdObj,
                  date,
                });
                newDate.save();
              }
            });

            allDays.length > 0 &&
              allDays.forEach((item, index) => {
                if (!unavailableDatesData.includes(item)) allDays[index].remove();
              });
          }

          const { sitter } = user;
          sitter.aboutSitter = aboutSitter;
          sitter.experience = experience;
          sitter.hasCat = hasCat;
          sitter.hasMedicationSkills = hasMedicationSkills;
          sitter.hasVolunteered = hasVolunteered;
          sitter.hasInjectionSkills = hasInjectionSkills;
          sitter.hasCertification = hasCertification;
          sitter.hasGroomingSkills = hasGroomingSkills;
          sitter.priceOneTime = priceOneTime;
          sitter.priceOvernight = priceOvernight;
          sitter.emergencyName = emergencyName;
          sitter.emergencyNumber = emergencyNumber;
          sitter.save();

          return res.status(200).json('Sitter profile successful updated');
        });
    }
  },
};
