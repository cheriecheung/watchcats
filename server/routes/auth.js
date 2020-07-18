const router = require('express').Router();
const JWT = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validation');
const passport = require('passport');
const User = require('../model/User');
const { verifyToken, signToken } = require('../helpers/token');

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
      window.opener.location.replace('http://localhost:3000/account');
      window.close();
    </script>`
  );
});

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', {
//     successRedirect: '/auth/google/success',
//     failureRedirect: '/auth/google/failure',
//   })
// );

router.post('/logout', verifyToken, (req, res) => {
  JWT.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = await User.findById(authData.sub);
      if (!user) return res.status(404).json('User not found');

      res.sendStatus(204);
    }
  });
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const token = signToken(req.user, process.env.JWT_SECRET);
    const user = req.user.name;

    return res.status(200).json({ token, user });
  }
);

router.post('/activate-account', verifyToken, (req, res) => {
  JWT.verify(
    req.token,
    process.env.JWT_VERIFY_SECRET,
    async (err, authData) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        const user = await User.findById(authData.sub);
        if (!user) return res.status(404).json('User not found');

        user.isVerified = true;
        await user.save();

        return res.status(200).json('YAY!');
      }
    }
  );
});

module.exports = router;
