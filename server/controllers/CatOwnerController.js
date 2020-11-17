const mongoose = require('mongoose');
const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');
const Cat = require('../model/Cat');
const Owner = require('../model/Owner');
const Review = require('../model/Review');
const User = require('../model/User');

const { catOwnerValidation } = require('../helpers/validation')

const ObjectId = require('mongodb').ObjectID;

module.exports = {
  getProfile: async (req, res) => {
    try {
      const [userRecord, ownerRecord] = await Promise.all([
        User.findOne({ urlId: req.params.id }),
        Owner.findOne({ urlId: req.params.id }),
      ]);

      if (!userRecord || !ownerRecord) return res.status(404).json('No account found');

      const { firstName, lastName, postcode, profilePictureFileName } = userRecord;
      const ownerId = mongoose.Types.ObjectId(ownerRecord.id);

      const [allOneDays, allOvernight, allCats, allReviews] = await Promise.all([
        AppointmentOneDay.find({ owner: ownerId }),
        AppointmentOvernight.find({ owner: ownerId }),
        Cat.find({ owner: ownerId }),
        Review.find({ reviewee: ownerId })
      ]);

      // if date is passed, delete document
      let bookingOneDay;
      if (allOneDays.length > 0) {
        bookingOneDay = allOneDays.map(({ id, date, startTime, endTime }) => ({
          id,
          date,
          startTime,
          endTime,
        }));
      }

      // if date is passed, delete document
      let bookingOvernight;
      if (allOvernight.length > 0) {
        bookingOvernight = allOvernight.map(({ id, startDate, endDate }) => ({
          id,
          startDate,
          endDate,
        }));
      }

      let cat;
      if (allCats.length > 0) {
        cat = allCats.map((item) => {
          const { _doc } = item;
          const { createdAt, owner, ...rest } = _doc || {};

          return rest;
        });
      }

      let reviews;
      if (allReviews.length > 0) {
        reviews = await Promise.all(
          allReviews.map(async ({ _doc: item }) => {
            const {
              firstName: reviewerFirstName,
              lastName: reviewerLastName,
              profilePictureFileName: reviewerprofilePictureFileName,
              urlId: reviewerUrlId
            } = await User.findOne({ sitter: item.reviewer })

            const data = {
              ...item,
              reviewerName: `${reviewerFirstName} ${reviewerLastName}`,
              reviewerPicture: reviewerprofilePictureFileName,
              reviewerUrlId
            }

            console.log({ data })

            return data
          })
        );
      }

      const ownerData = {
        ...ownerRecord._doc,
        firstName,
        lastName,
        postcode,
        profilePictureFileName,
        bookingOneDay,
        bookingOvernight,
        cat,
        reviews
      };

      return res.status(200).json(ownerData);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ err });
    }
  },

  getAccount: async (req, res) => {
    try {
      const ownerRecord = await Owner.findOne({ urlId: req.params.id });
      if (!ownerRecord) return res.status(204).json('No owner account');

      const { id, aboutMe, catsDescription } = ownerRecord;
      const ownerId = ObjectId(id)

      const [allOneDays, allOvernight, allCats] = await Promise.all([
        AppointmentOneDay.find({ owner: ownerId }),
        AppointmentOvernight.find({ owner: ownerId }),
        Cat.find({ owner: ownerId }),
      ]);

      // if selected appointment date is passed, delete it

      let bookingOneDay;
      if (allOneDays.length > 0) {
        bookingOneDay = allOneDays.map(({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        }));
      }

      let bookingOvernight;
      if (allOvernight.length > 0) {
        bookingOvernight = allOvernight.map(({ startDate, endDate }) => ({
          startDate,
          endDate,
        }));
      }

      let cat;
      if (allCats.length > 0) {
        cat = allCats.map((item) => {
          const { _doc } = item;
          const { _id, createdAt, owner, ...rest } = _doc || {};

          return rest;
        });
      }

      return res.status(200).json({
        aboutMe,
        bookingOneDay,
        bookingOvernight,
        cat,
        catsDescription,
      });
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

    const {
      bookingOneDay: oneDayArr,
      bookingOvernight: overnightArr,
      cat: catArr,
      ...rest
    } = req.body;

    const { error } = catOwnerValidation(req.body);
    if (error) return res.status(401).json(error.details[0].message);

    try {
      if (!userRecord.owner) {
        const newOwner = new Owner({
          _id: new mongoose.Types.ObjectId(),
          urlId: userRecord.urlId,
          ...rest,
        });

        await newOwner.save();
        userRecord.owner = newOwner._id;
        await userRecord.save();

        if (Array.isArray(oneDayArr) && oneDayArr.length > 0) {
          oneDayArr.forEach(async ({ date, startTime, endTime }) => {
            const dateObj = new Date(date);
            const startTimeObj = new Date(`${date} ${startTime}`);
            const endTimeObj = new Date(`${date} ${endTime}`);

            const newOneDay = new AppointmentOneDay({
              owner: newOwner._id,
              date: dateObj,
              startTime: startTimeObj,
              endTime: endTimeObj,
            });
            await newOneDay.save();
          });
        }

        if (Array.isArray(overnightArr) && overnightArr.length > 0) {
          overnightArr.forEach(async ({ startDate, endDate }) => {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            const newOvernight = new AppointmentOvernight({
              owner: newOwner._id,
              startDate: startDateObj,
              endDate: endDateObj,
            });
            await newOvernight.save();
          });
        }

        if (Array.isArray(catArr) && catArr.length > 0) {
          catArr.forEach(async ({ photo, ...rest }) => {
            const newCat = new Cat({
              owner: newOwner._id,
              ...rest,
            });
            await newCat.save();
          });
        }

        return res.status(201).json('Owner profile successfully created');
      }

      const ownerRecord = await Owner.findOneAndUpdate(
        { urlId: req.params.id },
        { $set: { ...rest } },
        { useFindAndModify: false }
      );
      if (!ownerRecord) return res.status(401).json('Fail to update');

      const { id: ownerId } = ownerRecord;

      const allOneDays = await AppointmentOneDay.find({ owner: ownerId });

      if (Array.isArray(oneDayArr) && oneDayArr.length > 0) {
        oneDayArr.forEach(async ({ date, startTime, endTime }, index) => {
          const dateObj = new Date(date);
          const startTimeObj = new Date(`${date} ${startTime}`);
          const endTimeObj = new Date(`${date} ${endTime}`);

          if (allOneDays[index]) {
            // not working
            if (!date && !startTime && !endTime) {
              allOneDays[index].remove();
              return;
            }

            allOneDays[index].date = dateObj;
            allOneDays[index].startTime = startTimeObj;
            allOneDays[index].endTime = endTimeObj;
            await allOneDays[index].save();
            return;
          }

          if (!date && !startTime && !endTime) return;

          const newOneDay = new AppointmentOneDay({
            owner: ownerId,
            date: dateObj,
            startTime: startTimeObj,
            endTime: endTimeObj,
          });
          await newOneDay.save();
          return;
        });

        allOneDays.forEach((item, index) => {
          if (!oneDayArr[index]) allOneDays[index].remove();
        });
      }

      if (Array.isArray(oneDayArr) && oneDayArr.length === 0 && allOneDays.length > 0) {
        allOneDays.forEach((item, index) => allOneDays[index].remove());
      }

      const allOvernight = await AppointmentOvernight.find({ owner: ownerId });

      if (Array.isArray(overnightArr) && overnightArr.length > 0) {

        overnightArr.forEach(async ({ startDate, endDate }, index) => {
          if (!startDate || !endDate) return;

          if (allOvernight[index]) {
            allOvernight[index].startDate = startDate;
            allOvernight[index].endDate = endDate;
            await allOvernight[index].save();
            return;
          }

          const newOvernight = new AppointmentOvernight({
            owner: ownerId,
            startDate,
            endDate,
          });
          await newOvernight.save();
          return;
        });

        allOvernight.forEach((item, index) => {
          if (!overnightArr[index]) allOvernight[index].remove();
        });
      }

      if (Array.isArray(overnightArr) && overnightArr.length === 0 && allOvernight.length > 0) {
        allOvernight.forEach((item, index) => allOvernight[index].remove());
      }

      if (Array.isArray(catArr) && catArr.length > 0) {
        const allCats = await Cat.find({
          owner: ownerId,
        });

        catArr.forEach(async (item, index) => {
          const {
            name,
            age,
            gender,
            medicalNeeds,
            isVaccinated,
            isInsured,
            breed,
            personality,
            favouriteTreat,
          } = item;

          if (allCats[index]) {
            allCats[index].name = name;
            allCats[index].age = age;
            allCats[index].gender = gender;
            allCats[index].medicalNeeds = medicalNeeds;
            allCats[index].isVaccinated = isVaccinated;
            allCats[index].isInsured = isInsured;
            allCats[index].breed = breed;
            allCats[index].personality = personality;
            allCats[index].favouriteTreat = favouriteTreat;
            await allCats[index].save();
          } else {
            const newCat = new Cat({
              owner: ownerId,
              name,
              age,
              gender,
              medicalNeeds,
              isVaccinated,
              isInsured,
              breed,
              personality,
              favouriteTreat,
            });
            await newCat.save();
          }
        });

        allCats.forEach((item, index) => {
          if (!catArr[index]) allCats[index].remove();
        });
      }

      return res.status(201).json('Owner profile successfully saved');
    } catch (err) {
      console.log({ err });
      return res.status(401).json({ err });
    }
  },
};
