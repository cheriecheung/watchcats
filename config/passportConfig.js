const User = require('../model/User');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const JWT = require('jsonwebtoken');

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub);
          if (!user) return done(null, false);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

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
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        User.findOne({ google_id: profile.id }).then(async (currentUser) => {
          if (currentUser) {
            console.log({ currentUser, accessToken, profile: profile._json });

            // return token too

            return done(null, currentUser);
          } else {
            const newUser = new User({
              name: profile.displayName,
              email: profile._json.email,
              google_id: profile.id,
            });

            try {
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

              console.log({ token, newUser });
              return done(null, newUser, { token });
              // return { token };
            } catch (error) {
              console.log(error.message);
              return { error };
            }

            // new User({
            //   name: profile.displayName,
            //   email: profile._json.email,
            //   google_id: profile.id,
            // })
            //   .save()
            //   .then((newUser) => {
            //     console.log(`New user created: ${newUser}`);

            //     return done(null, newUser);
            //   });
          }
        });
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
