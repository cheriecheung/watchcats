const User = require('../model/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JWT = require('jsonwebtoken');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false);

          const isMatch = await user.isValidPassword(password);
          if (!isMatch) return done(null, false);

          if (!user.isVerified) return done(null, false);

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        email: user.email,
      };
      cb(err, userInformation);
    });
  });
};
