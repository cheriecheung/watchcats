const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const JWT = require('jsonwebtoken');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { signAccessToken, createVerifyEmailToken, createResetPasswordToken } = require('../helpers/token');
const { changePasswordValidation, phoneNumberValidation, personalDataValidation } = require('../helpers/validation')

const { JWT_VERIFY_SECRET, JWT_RESET_PW_SECRET } = process.env

module.exports = {
  get: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    return res.status(200).json(user);
  },

  post: async (req, res) => {
    const { userId } = req.verifiedData
    if (!userId) return res.status(403).json('User id missing');

    const { error } = personalDataValidation(req.body)
    console.log({ error })
    if (error) return res.status(401).json(error.details[0].message);

    try {
      const userRecord = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { ...req.body } },
        { useFindAndModify: false }
      );
      if (!userRecord) return res.status(401).json('Fail to update');

      return res.status(200).json('User general profile successful saved');
    } catch (e) {
      console.log({ e });
      return res.status(401).json('Unsuccessful');
    }
  },

  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ error: 'Email already exists' });

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });

    // const secretToken = signAccessToken(newUser, JWT_VERIFY_SECRET);
    // sendActivateMail(email, secretToken);

    const token = createVerifyEmailToken(newUser.id);
    sendActivateMail(token)

    try {
      await newUser.save();
      return res
        .status(201)
        .json('A link to activate your account has been sent to the email provided. Be sure to check the spam / junk mailbox if the email is not found in the main inbox.');
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error });
    }
  },

  getActivationEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email' });
      if (user.isVerified) return res.status(200).json('Account has previously been activated');

      // const secretToken = signAccessToken(user, JWT_VERIFY_SECRET);
      // sendActivateMail(email, secretToken);

      const token = createVerifyEmailToken(user.id);
      sendActivateMail(token)

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
