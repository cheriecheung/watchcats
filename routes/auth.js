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
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(
    `<script>
    const targetWindow = window.opener
      targetWindow.postMessage("The user is");
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

router.post('/login', (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).json('No User Exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Successfully Authenticated');
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post('/register', (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) return res.status(409).json('Email is already in use');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = JWT.sign(
        {
          iss: 'FindPetSitter',
          sub: newUser.id,
          iat: new Date().getTime(), // current time
          exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
        },
        process.env.JWT_SECRET
      );

      return res.status(201).json({ token });
    }
  });
});

module.exports = router;
