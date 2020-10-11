const mongoose = require('mongoose');
const User = require('../model/User');
const Owner = require('../model/Owner');
const Cat = require('../model/Cat');
const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const [userRecord, ownerRecord] = await Promise.all([
        User.findOne({ urlId: req.params.id }),
        Owner.findOne({ urlId: req.params.id }),
      ]);

      if (!userRecord || !ownerRecord) return res.status(404).json('No account found');

      const { firstName, lastName, postcode, profilePictureFileName } = userRecord;

      const [allOneDays, allOvernight, allCats] = await Promise.all([
        AppointmentOneDay.find({
          owner: mongoose.Types.ObjectId(ownerRecord.id),
        }),
        AppointmentOvernight.find({
          owner: mongoose.Types.ObjectId(ownerRecord.id),
        }),
        Cat.find({
          owner: mongoose.Types.ObjectId(ownerRecord.id),
        }),
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

      const ownerData = {
        ...ownerRecord._doc,
        firstName,
        lastName,
        postcode,
        profilePictureFileName,
        bookingOneDay,
        bookingOvernight,
        cat,
      };

      return res.status(200).json(ownerData);
    } catch (err) {
      console.log({ err });
      return res.status(500).json({ err });
    }
  },

  getAccount: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    try {
      const ownerRecord = await Owner.findOne({ urlId: req.params.id });
      if (!ownerRecord) return res.status(404).json('No owner account');

      const { id: ownerId, aboutMe, catsDescription } = ownerRecord;

      const [allOneDays, allOvernight, allCats] = await Promise.all([
        AppointmentOneDay.find({
          owner: mongoose.Types.ObjectId(ownerId),
        }),
        AppointmentOvernight.find({
          owner: mongoose.Types.ObjectId(ownerId),
        }),
        Cat.find({
          owner: mongoose.Types.ObjectId(ownerId),
        }),
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
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const userRecord = await User.findById(userId);
    if (!userRecord) return res.status(404).json('No user found');

    const {
      bookingOneDay: oneDayArr,
      bookingOvernight: overnightArr,
      cat: catArr,
      ...rest
    } = req.body;

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

        if (oneDayArr.length > 0) {
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

        if (overnightArr.length > 0) {
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

        if (catArr.length > 0) {
          catArr.forEach(async ({ ...rest }) => {
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
      if (!ownerRecord) return res.status(400).json('Fail to update');

      const { id: ownerId } = ownerRecord;

      if (oneDayArr.length > 0) {
        const allOneDays = await AppointmentOneDay.find({
          owner: ownerId,
        });

        oneDayArr.forEach(async ({ date, startTime, endTime }, index) => {
          if (allOneDays[index]) {

            // not working
            if (!date && !startTime && !endTime) {
              allOneDays[index].remove();
              return;
            }

            allOneDays[index].date = date;
            allOneDays[index].startTime = startTime;
            allOneDays[index].endTime = endTime;
            await allOneDays[index].save();
            return;
          }

          if (!date && !startTime && !endTime) return;

          const newOneDay = new AppointmentOneDay({
            owner: ownerId,
            date,
            startTime,
            endTime,
          });
          await newOneDay.save();
          return;
        });

        allOneDays.forEach((item, index) => {
          if (!oneDayArr[index]) allOneDays[index].remove();
        });
      }

      if (overnightArr.length > 0) {
        const allOvernight = await AppointmentOvernight.find({
          owner: ownerId,
        });

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

      if (catArr.length > 0) {
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
      return res.status(500).json({ err });
    }
  },
};
