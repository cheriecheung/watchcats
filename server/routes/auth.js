const router = require('express').Router();
const JWT = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validation');
const passport = require('passport');
const User = require('../model/User');
const Member = require('../model/Member');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');

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

router.post('/logout', verifyAccessToken, (req, res) => {
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

    const token = signAccessToken(req.user, process.env.JWT_SECRET);
    const user = req.user.name;

    return res.status(200).json({ token, user });
  }
);

router.post('/activate-account', verifyAccessToken, (req, res) => {
  JWT.verify(
    req.token,
    process.env.JWT_VERIFY_SECRET,
    async (err, authData) => {
      if (err) {
        console.log(err);
        return res.status(403).json('Unable to activate account');
      } else {
        const user = await User.findById(authData.sub);
        if (!user) return res.status(404).json('User not found');

        if (user.isVerified)
          return res.status(400).json('Account has already been activated');

        if (Date.now() >= authData.exp)
          return res.status(401).json('Token is expired!');

        user.isVerified = true;
        await user.save();

        const member = await Member.findOne({ userId: user._id });
        if (member)
          return res.status(400).json('Account has already been activated');

        const newMember = new Member({
          userId: user._id,
          name: user.name,
          email: user.email,
        });

        if (!newMember) return res.status(400).json('Unable to save member');
        await newMember.save();

        return res.status(200).json('Account activate verified');
      }
    }
  );
});

module.exports = router;
