const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { createVerifyEmailToken, createResetPasswordToken } = require('../helpers/token');

module.exports = {
  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { name, email, password } = req.body;

    console.log({ name, email, password })
    // try {
    //   const emailExists = await User.findOne({ email });
    //   if (emailExists) return res.status(400).json({ error: 'Email already exists' });

    //   const salt = await bcrypt.genSalt(12);
    //   const hashedPassword = await bcrypt.hash(password, salt);

    //   const newUser = new User({ name, email, password: hashedPassword });
    //   await newUser.save();

    //   const token = createVerifyEmailToken(newUser.id);
    //   sendActivateMail(email, token)

    //   return res
    //     .status(201)
    //     .json('A link to activate your account has been sent to the email provided. Be sure to check the spam / junk mailbox if the email is not found in the main inbox.');
    // } catch (error) {
    //   console.log(error.message);
    //   return res.status(400).json({ error });
    // }
  },

  getActivationEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email' });
      if (user.isVerified) return res.status(200).json('Account has previously been activated');

      const { id, email: userEmail } = user;

      const token = createVerifyEmailToken(id);
      sendActivateMail(userEmail, token)

      return res.status(200).json('success');
    } catch (err) {
      return res.status(400).json('error');
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

  resetPassword: async (req, res) => {
    console.log({ email: req.body.email })
    // JWT.verify(req.token, JWT_RESET_PW_SECRET, async (err, authData) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(401).json('Incorrect or expired token.');
    //   } else {
    //     const user = await User.findById(authData.sub);
    //     if (!user) return res.status(404).json('User not found');

    //     const salt = await bcrypt.genSalt(12);
    //     const hashPassword = await bcrypt.hash(req.body.password, salt);

    //     user.password = hashPassword;
    //     await user.save();

    //     return res.status(200).json('You have successfully changed your password.');
    //   }
    // });
  },
};
