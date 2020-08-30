const mongoose = require('mongoose');
const User = require('../model/User');
const Owner = require('../model/Owner');
const Cat = require('../model/Cat');
const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');

module.exports = {
  get: async (req, res) => {
    const userId = req.headers['authorization'];

    // ---------------- if (user.owner)

    // if appointment date is passed, delete it

    //User.findById(req.session.userId)
    User.findById(userId)
      .populate('owner')
      .exec(async (err, user) => {
        if (err) return err;

        const {
          owner: { id: ownerId, aboutMe, catsDescription },
        } = user;

        let bookingOneDay, bookingOvernight, cat;

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

        if (allOneDays.length > 0) {
          bookingOneDay = allOneDays.map(({ date, startTime, endTime }) => ({
            date,
            startTime,
            endTime,
          }));
        }

        if (allOvernight.length > 0) {
          bookingOvernight = allOvernight.map(({ startDate, endDate }) => ({
            startDate,
            endDate,
          }));
        }

        if (allCats.length > 0) {
          cat = allCats.map(
            ({
              name,
              age,
              gender,
              medicalNeeds,
              isVaccinated,
              isInsured,
              breed,
              personality,
              favouriteTreat,
            }) => ({
              name,
              age,
              gender,
              medicalNeeds,
              isVaccinated,
              isInsured,
              breed,
              personality,
              favouriteTreat,
            })
          );
        }

        return res.status(200).json({
          aboutMe,
          bookingOneDay,
          bookingOvernight,
          cat,
          catsDescription,
        });
      });
  },

  post: async (req, res) => {
    const userId = req.headers['authorization'];
    const user = await User.findById(userId);
    const {
      aboutMe,
      bookingOneDay: oneDay,
      bookingOvernight: overnight,
      cat: catData,
      catsDescription,
    } = req.body;

    if (!user.owner) {
      const newOwner = new Owner({
        _id: new mongoose.Types.ObjectId(),
        aboutMe,
        catsDescription,
      });

      if (oneDay.length > 0) {
        oneDay.forEach(({ date, startTime, endTime }) => {
          const newOneDay = new AppointmentOneDay({
            owner: newOwner._id,
            date,
            startTime,
            endTime,
          });
          newOneDay.save();
        });
      }

      if (overnight.length > 0) {
        overnight.forEach(({ startDate, endDate }) => {
          const newOvernight = new AppointmentOvernight({
            owner: newOwner._id,
            startDate,
            endDate,
          });
          newOvernight.save();
        });
      }

      if (catData.length > 0) {
        catData.forEach(
          ({
            name,
            age,
            gender,
            medicalNeeds,
            isVaccinated,
            isInsured,
            breed,
            personality,
            favouriteTreat,
          }) => {
            const newCat = new Cat({
              owner: newOwner._id,
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
            newCat.save();
          }
        );
      }

      await newOwner.save((err) => {
        if (err) return err;
        user.owner = newOwner._id;
        user.save();

        return res.status(201).json('Owner profile successful created');
      });
    }

    if (user.owner) {
      User.findById(userId)
        .populate('owner')
        .exec(async (err, user) => {
          if (err) return err;

          const ownerIdObj = user.owner;

          if (oneDay.length > 0) {
            const allOneDays = await AppointmentOneDay.find({
              owner: ownerIdObj,
            });

            oneDay.forEach(({ date, startTime, endTime }, index) => {
              if (allOneDays[index]) {
                allOneDays[index].date = date;
                allOneDays[index].startTime = startTime;
                allOneDays[index].endTime = endTime;
                allOneDays[index].save();
              } else {
                const newOneDay = new AppointmentOneDay({
                  owner: ownerIdObj,
                  date,
                  startTime,
                  endTime,
                });
                newOneDay.save();
              }
            });

            allOneDays.forEach((item, index) => {
              if (!oneDay[index]) allOneDays[index].remove();
            });
          }

          if (overnight.length > 0) {
            const allOvernight = await AppointmentOvernight.find({
              owner: ownerIdObj,
            });

            overnight.forEach(({ startDate, endDate }, index) => {
              if (allOvernight[index]) {
                allOvernight[index].startDate = startDate;
                allOvernight[index].endDate = endDate;
                allOvernight[index].save();
              } else {
                const newOvernight = new AppointmentOvernight({
                  owner: ownerIdObj,
                  startDate,
                  endDate,
                });
                newOvernight.save();
              }
            });

            allOvernight.forEach((item, index) => {
              if (!overnight[index]) allOvernight[index].remove();
            });
          }

          if (catData.length > 0) {
            const allCats = await Cat.find({
              owner: ownerIdObj,
            });

            catData.forEach(
              (
                {
                  name,
                  age,
                  gender,
                  medicalNeeds,
                  isVaccinated,
                  isInsured,
                  breed,
                  personality,
                  favouriteTreat,
                },
                index
              ) => {
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
                  allCats[index].save();
                } else {
                  const newCat = new Cat({
                    owner: ownerIdObj,
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
                  newCat.save();
                }
              }
            );

            allCats.forEach((item, index) => {
              if (!catData[index]) allCats[index].remove();
            });
          }

          const { owner } = user;
          owner.aboutMe = aboutMe;
          owner.catsDescription = catsDescription;
          owner.save();

          return res.status(200).json('Owner profile successful updated');
        });
    }
  },
};
