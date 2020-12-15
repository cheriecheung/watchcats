const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Review = require('../model/Review');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { createVerifyEmailToken, createResetPasswordToken } = require('../helpers/token');
const shortid = require('shortid');

module.exports = {
  generateTestAccounts: async (req, res) => {
    try {
      const owner = await Review.findOne({ idd: '1234' })

      owner.content = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores provident placeat quisquam labore. Eveniet possimus, vero provident quaerat nemo aliquid quae repellendus ab, quis, officia culpa doloribus repudiandae sit deserunt odio numquam sunt officiis autem modi? Sunt reiciendis sequi culpa!Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
      
      Asperiores provident placeat quisquam labore. Eveniet possimus, vero provident quaerat nemo aliquid quae repellendus ab, quis, officia culpa doloribus repudiandae sit deserunt odio numquam sunt officiis autem modi? Sunt reiciendis sequi culpa!`
      owner.save();

      // for (let i = 10; i < 15; i++) {
      //   const newUser = new User({
      //     name: `Test #${i}`,
      //     email: `${i}@test.com`,
      //     urlId: shortid.generate(),
      //   });
      //   await newUser.save();
      // }

      return res.status(200).json('You saved the new test accounts')
    }
    catch (err) {
      console.log({ err })
    }
  },

  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json('ERROR/ERROR_OCCURED');

    const { name, email, password } = req.body;

    console.log({ name, email, password })
    try {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json('ERROR/EMAIL_ALREADY_EXISTS');

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = createVerifyEmailToken(newUser.id);
      sendActivateMail(email, token)

      return res
        .status(201)
        .json('A link to activate your account has been sent to the email provided. Be sure to check the spam / junk mailbox if the email is not found in the main inbox.');
    } catch (error) {
      console.log(error.message);
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getActivationEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json('ERROR/ERROR_OCCURED');
      if (user.isVerified) return res.status(200).json('ERROR/ACCOUNT_ALREADY_ACTIVATED');

      const { id, email: userEmail } = user;

      const token = createVerifyEmailToken(id);
      sendActivateMail(userEmail, token)

      return res.status(200).json('success');
    } catch (err) {
      return res.status(400).json('ERROR/ERROR_OCCURED');
    }
  },

  getPasswordResetEmail: async (req, res) => {
    const { email } = req.body;

    console.log({ email })

    // const user = await User.findOne({ email });
    // if (!user) return res.status(403).json('Error');

    // const secretToken = signAccessToken(user, JWT_RESET_PW_SECRET);
    // sendResetPwMail(email, secretToken);

    // return res.status(200).json('Email requested');
  },
};


// const { registerValidation } = require('../helpers/validation');
// const bcrypt = require('bcryptjs');
// const User = require('../model/User');
// const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
// const { createVerifyEmailToken, createResetPasswordToken } = require('../helpers/token');
// const shortid = require('shortid');

// module.exports = {
//   generateTestAccounts: async (req, res) => {
//     for (let i = 0; i < 10; i++) {
//       const newUser = new User({
//         name: `Test #${i}`,
//         email: `${i}@test.com`,
//         urlId: shortid.generate(),
//       });
//       await newUser.save();
//     }

//     return res.status(200).json('You saved the new test accounts')
//   },

//   register: async (req, res) => {
//     const { error } = registerValidation(req.body);
//     if (error) return res.status(400).json(error.details[0].message);

//     const { name, email, password } = req.body;

//     console.log({ name, email, password })
//     // try {
//     //   const emailExists = await User.findOne({ email });
//     //   if (emailExists) return res.status(400).json({ error: 'Email already exists' });

//     //   const salt = await bcrypt.genSalt(12);
//     //   const hashedPassword = await bcrypt.hash(password, salt);

//     //   const newUser = new User({ name, email, password: hashedPassword });
//     //   await newUser.save();

//     //   const token = createVerifyEmailToken(newUser.id);
//     //   sendActivateMail(email, token)

//     //   return res
//     //     .status(201)
//     //     .json('A link to activate your account has been sent to the email provided. Be sure to check the spam / junk mailbox if the email is not found in the main inbox.');
//     // } catch (error) {
//     //   console.log(error.message);
//     //   return res.status(400).json({ error });
//     // }
//   },

//   getActivationEmail: async (req, res) => {
//     const { email } = req.body;

//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ error: 'Invalid email' });
//       if (user.isVerified) return res.status(200).json('Account has previously been activated');

//       const { id, email: userEmail } = user;

//       const token = createVerifyEmailToken(id);
//       sendActivateMail(userEmail, token)

//       return res.status(200).json('success');
//     } catch (err) {
//       return res.status(400).json('error');
//     }
//   },

//   getPasswordResetEmail: async (req, res) => {
//     const { email } = req.body;

//     console.log({ email })

//     // const user = await User.findOne({ email });
//     // if (!user) return res.status(403).json('Error');

//     // const secretToken = signAccessToken(user, JWT_RESET_PW_SECRET);
//     // sendResetPwMail(email, secretToken);

//     // return res.status(200).json('Email requested');
//   },
// };
