const User = require('../model/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
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

  passport.use(
    'google-auth-req',
    new GoogleStrategy(
      {
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        scope: 'profile',
        state: true,
        response_type: 'code',
        pkce: true,
        //code_challenge: codeChallenge,
        //code_challenge_method: 'S256',
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        const authCode = request.originalUrl;
        console.log({ accessToken });
        //return done(null, { id: 875837527940 });
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
