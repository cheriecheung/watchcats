const router = require('express').Router();
const verify = require('./verifyToken');
const { registerValidation } = require('../helpers/validation');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const randomstring = require('randomstring');
const JWT = require('jsonwebtoken');
const sendMail = require('../helpers/mailer');

const signToken = (user) => {
  return JWT.sign(
    {
      iss: 'FindPetSitter',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.JWT_VERIFY_SECRET
  );
};

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) return res.status(403).json({ error: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const secretToken = signToken(newUser);

  sendMail(req.body.email, secretToken);

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

// router.post('/verify', async (req, res) => {
//   const { secretToken } = req.body;

//   const user = await User.findOne({ secretToken: secretToken });

//   if (!user) return res.status(404).json('User not found');

//   user.isVerified = true;
//   user.secretToken = '';
//   await user.save();

//   return res.status(200).json('You can now log in');
// });

module.exports = router;
