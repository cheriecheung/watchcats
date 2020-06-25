const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/User');

passport.serializeUser((user, done) => {
  // user.id to be attached to the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ google_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`user is: ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile._json.email,
            google_id: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log(`New user created: ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);
