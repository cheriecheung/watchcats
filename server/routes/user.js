const router = require('express').Router();
const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Owner = require('../model/Owner');
const Sitter = require('../model/Sitter');
const AppointmentOneDay = require('../model/AppointmentOneDay');
const AppointmentOvernight = require('../model/AppointmentOvernight');
const Cat = require('../model/Cat');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).json({ error: 'Email already exists' });

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const secretToken = signAccessToken(newUser, process.env.JWT_VERIFY_SECRET);

  sendActivateMail(req.body.email, secretToken);

  try {
    await newUser.save();
    return res
      .status(201)
      .json(
        'A link to activate your account has been emailed to the address provided.'
      );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error });
  }
});

// router.post('/send-verify-email', async (req, res) => {
//   // const {}
// })

router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const responseMsg =
    'If that email address is in our database, we will send you an email to reset your password.';

  if (!user) return res.status(403).json(responseMsg);

  const secretToken = signAccessToken(user, process.env.JWT_RESET_PW_SECRET);
  sendResetPwMail(req.body.email, secretToken);

  return res.status(200).json(responseMsg);
});

router.post('/password-reset', verifyAccessToken, async (req, res) => {
  JWT.verify(
    req.token,
    process.env.JWT_RESET_PW_SECRET,
    async (err, authData) => {
      if (err) {
        console.log(err);
        return res.status(401).json('Incorrect or expired token.');
      } else {
        const user = await User.findById(authData.sub);
        if (!user) return res.status(404).json('User not found');

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();

        return res
          .status(200)
          .json('You have successfully changed your password.');
      }
    }
  );
});

router.get('/sitter', async (req, res) => {
  const userId = req.headers['authorization'];
  // const user = await User.findById(userId);

  // if (user.sitter) {
  User.findById(userId)
    .populate('sitter')
    .exec(async (err, user) => {
      if (err) return err;

      const {
        sitter: {
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
        //unavailableDates: [],
        emergencyName,
        emergencyNumber,
      });
    });
  // }

  // return res.status(200).json('Youve arrived in sitter profile page');
});

router.post('/sitter', async (req, res) => {
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
    emergencyName,
    emergencyNumber,
  } = req.body;

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
});

router.get('/owner', async (req, res) => {
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
});

router.post('/owner', async (req, res) => {
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
});

module.exports = router;
