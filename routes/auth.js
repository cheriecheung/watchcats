const router = require('express').Router();
const User = require('../model/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  registerValidation,
  loginValidation,
} = require('../helpers/validation');
const passport = require('passport');

router.get('/logout', (req, res) => {
  req.logout();
  console.log('youre now loggedout');
});

router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(res.user);
    return res.status(200).json({ secret: 'resource' });
  }
);

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(res.req.authInfo);
  res.send(
    `<script>
      window.localStorage.setItem('token', res.req.authInfo)
      window.opener.location.replace('http://localhost:3001/account');
      window.close();
    </script>`
  );
});
// window.localStorage.setItem('JWT', 'you have your tokens here');

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', {
//     successRedirect: '/auth/google/success',
//     failureRedirect: '/auth/google/failure',
//   })
// );

const signToken = (user) => {
  return JWT.sign(
    {
      iss: 'FindPetSitter',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    const token = signToken(req.user);
    return res.status(200).json({ token });
  }
);

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

  try {
    await newUser.save();
    const token = signToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error });
  }
});

module.exports = router;
