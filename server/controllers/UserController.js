const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const JWT = require('jsonwebtoken');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');

const { JWT_VERIFY_SECRET } = process.env

module.exports = {
  get: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      postcode,
      profileFacebook,
      profileInstagram,
      profileOther,
      profilePictureFileName,
    } = user;

    return res.status(200).json({
      firstName,
      lastName,
      email,
      phone,
      address,
      postcode,
      profileFacebook,
      profileInstagram,
      profileOther,
      profilePictureFileName,
    });
  },

  post: async (req, res) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(403).json('User id missing');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json('User not found');

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      postcode,
      profileFacebook,
      profileInstagram,
      profileOther,
    } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.postcode = postcode;
    user.profileFacebook = profileFacebook;
    user.profileInstagram = profileInstagram;
    user.profileOther = profileOther;

    try {
      await user.save();
      return res.status(200).json('User general profile successful saved');
    } catch (e) {
      console.log({ e });
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

    const secretToken = signAccessToken(newUser, JWT_VERIFY_SECRET);
    sendActivateMail(email, secretToken);

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

  requestActivationEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid email' });
      if (user.isVerified) return res.status(200).json('Account has previously been activated');

      const secretToken = signAccessToken(user, JWT_VERIFY_SECRET);
      sendActivateMail(email, secretToken);

      return res.status(200).json('success');
    } catch (err) {
      return res.status(400).json('error');
    }
  },

  forgotPassword: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const responseMsg =
      'If that email address is in our database, we will send you an email to reset your password.';

    if (!user) return res.status(403).json(responseMsg);

    const secretToken = signAccessToken(user, process.env.JWT_RESET_PW_SECRET);
    sendResetPwMail(req.body.email, secretToken);

    return res.status(200).json(responseMsg);
  },

  passwordReset: async (req, res) => {
    JWT.verify(req.token, process.env.JWT_RESET_PW_SECRET, async (err, authData) => {
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

        return res.status(200).json('You have successfully changed your password.');
      }
    });
  },
};
