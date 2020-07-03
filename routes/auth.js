const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
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
  res.send('<script>window.close()</script>');
  // return res.status(200).json(req.user);
});

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', {
//     successRedirect: '/auth/google/success',
//     failureRedirect: '/auth/google/failure',
//   })
// );

module.exports = router;
