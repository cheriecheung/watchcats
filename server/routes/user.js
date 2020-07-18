const router = require('express').Router();
const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const JWT = require('jsonwebtoken');
const { sendActivateMail, sendResetPwMail } = require('../helpers/mailer');
const { verifyToken, signToken } = require('../helpers/token');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).json({ error: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const secretToken = signToken(newUser, process.env.JWT_VERIFY_SECRET);

  sendActivateMail(req.body.email, secretToken);

  try {
    await newUser.save();
    return res.status(201);
    // const token = signToken(newUser);
    // return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error });
  }
});

router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(403)
      .json({ error: 'User with this email does not exists' });

  const secretToken = signToken(user, process.env.JWT_RESET_PW_SECRET);

  sendResetPwMail(req.body.email, secretToken);
});

router.post('/password-reset', verifyToken, async (req, res) => {
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

        const salt = await bcrypt.genSalt(10);
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

module.exports = router;
