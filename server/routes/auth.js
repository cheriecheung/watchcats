const router = require('express').Router();
const JWT = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validation');
const passport = require('passport');
const User = require('../model/User');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const { generateCodes, authenticateUser } = require('../helpers/authentication');
const { googleLogin, googleUser } = require('../controllers/AuthController');

router.get('/googlelogin', generateCodes, googleLogin);

router.get('/oauth2callback', authenticateUser);

router.get('/getUser', googleUser);

router.get('/checkloggedIn', async (req, res) => {
  console.log({ checkloggedIn: req.session.userId });
  return res.json(req.session.userId);
});

router.delete('/userlogout', (req, res) => {
  console.log({ REQsession: req.session });
});

// router.post('/logout', verifyAccessToken, (req, res) => {
//   JWT.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       const user = await User.findById(authData.sub);
//       if (!user) return res.status(404).json('User not found');

//       res.sendStatus(204);
//     }
//   });
// });

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    const { error } = loginValidation(req.body);
    //if (error) return res.status(400).json(error.details[0].message);
    if (error) return res.status(400).json('Login failed; Invalid user ID or password.');

    const token = signAccessToken(req.user, process.env.JWT_SECRET);
    const user = req.user.name;

    return res.status(200).json({ token, user });
  }
);

router.post('/activate-account', verifyAccessToken, (req, res) => {
  JWT.verify(req.token, process.env.JWT_VERIFY_SECRET, async (err, authData) => {
    if (err) {
      console.log(err);
      return res.status(403).json('Unable to activate account');
    } else {
      const user = await User.findById(authData.sub);
      if (!user) return res.status(404).json('User not found');

      if (user.isVerified) return res.status(400).json('Account has already been activated');

      if (Date.now() >= authData.exp) return res.status(401).json('Token is expired!');

      user.isVerified = true;
      await user.save();

      return res.status(200).json('Account activate verified');
    }
  });
});

module.exports = router;
