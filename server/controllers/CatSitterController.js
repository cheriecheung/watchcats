const mongoose = require('mongoose');
const Review = require('../model/Review')
const Sitter = require('../model/Sitter');
const UnavailableDate = require('../model/UnavailableDate');
const User = require('../model/User');

const { getProfileStats } = require('../helpers/profile')
const { getUnavailableDates } = require('../helpers/user');
const { catSitterValidation } = require('../helpers/validation')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const [userRecord, sitterRecord] = await Promise.all([
        User.findOne({ urlId: req.params.id }),
        Sitter.findOne({ urlId: req.params.id }),
      ]);

      if (!userRecord || !sitterRecord) return res.status(404).json('No account found');

      const { firstName, lastName, profilePicture, coordinates } = userRecord;

      const sitterId = mongoose.Types.ObjectId(sitterRecord.id);

      const [stats, unavailableDates, allReviews] = await Promise.all([
        getProfileStats('sitter', sitterId),
        getUnavailableDates(sitterId),
        Review.find({ reviewee: sitterId })
      ]);

      const {
        totalReviews,
        totalCompletedBookings,
        totalRepeatedCustomers
      } = stats;

      let reviews;
      if (allReviews.length > 0) {
        reviews = await Promise.all(
          allReviews.map(async ({ _doc: item }) => {
            const {
              firstName: reviewerFirstName,
              lastName: reviewerLastName,
              profilePicture: reviewerprofilePicture,
              urlId: reviewerUrlId
            } = await User.findOne({ owner: item.reviewer })

            const data = {
              ...item,
              reviewerName: `${reviewerFirstName} ${reviewerLastName}`,
              reviewerPicture: reviewerprofilePicture,
              reviewerUrlId
            }

            return data
          })
        );
      }

      const sitterData = {
        ...sitterRecord._doc,
        unavailableDates,
        firstName,
        lastName,
        profilePicture,
        totalReviews,
        totalCompletedBookings,
        totalRepeatedCustomers,
        coordinates,
        reviews,
      };

      return res.status(200).json(sitterData);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ err });
    }
  },

  getAccount: async (req, res) => {
    // get by user id from verified token
    try {
      const sitterRecord = await Sitter.findOne({ urlId: req.params.id });
      if (!sitterRecord) return res.status(404)

      const unavailableDates = await getUnavailableDates(sitterRecord.id);
      const sitterData = { ...sitterRecord._doc, unavailableDates };

      return res.status(200).json(sitterData);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ err });
    }
  },

  postAccount: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(404).json('No user found');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('No user found');

    const { unavailableDates: unavailableDatesArr, ...rest } = req.body;

    const { error } = catSitterValidation(req.body);
    if (error) return res.status(401).json(error.details[0].message);

    try {
      if (!userRecord.sitter) {
        const newSitter = new Sitter({
          _id: new mongoose.Types.ObjectId(),
          urlId: userRecord.urlId,
          ...rest,
        });

        await newSitter.save();
        userRecord.sitter = newSitter._id;
        await userRecord.save();

        if (unavailableDatesArr.length > 0) {
          unavailableDatesArr.forEach(async (date) => {
            const dateObj = new Date(date);

            const newDate = new UnavailableDate({
              sitter: newSitter._id,
              date: dateObj,
            });
            await newDate.save();
          });
        }

        return res.status(201).json('Sitter profile successfully created');
      }

      const sitterRecord = await Sitter.findOneAndUpdate(
        { urlId: req.params.id },
        { $set: { ...rest } },
        { useFindAndModify: false }
      );
      if (!sitterRecord) return res.status(400).json('Fail to update');

      const { id: sitterId } = sitterRecord;

      if (unavailableDatesArr.length > 0) {
        const allDays = await UnavailableDate.find({
          sitter: sitterId,
        });

        unavailableDatesArr.forEach(async (date) => {
          if (!allDays.includes(date)) {
            const dateObj = new Date(date);

            const newDate = new UnavailableDate({
              sitter: sitterId,
              date: dateObj,
            });
            await newDate.save();
          }
        });

        allDays.length > 0 &&
          allDays.forEach((item, index) => {
            if (!unavailableDatesArr.includes(item)) allDays[index].remove();
          });
      }

      return res.status(200).json('Sitter profile successfully saved');
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ err });
    }
  },
};
