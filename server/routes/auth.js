const router = require('express').Router();
const { loginValidation } = require('../helpers/validation');
const User = require('../model/User');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const { generateCodes, authenticateUser } = require('../helpers/authentication');
const { googleLogin, googleUser } = require('../controllers/AuthController');
const bcrypt = require('bcryptjs');

router.get('/googlelogin', generateCodes, googleLogin);

router.get('/oauth2callback', authenticateUser);

router.get('/getUser', googleUser);

router.get('/checkloggedIn', async (req, res) => {
  console.log({ checkloggedIn: req.session.userId });
  return res.json(req.session.userId);
});

router.delete('/logout', (req, res) => {
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

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid email / password combination' });

  const validPass = await bcrypt.compare(password, user.password)
  if (!validPass) return res.status(400).json({ error: 'Invalid email / password combination' });

  const token = signAccessToken(user, process.env.JWT_SECRET);

  // return res.status(200).json({ token })
  return res.header('auth-token', token).json('login success')
}
);

router.post('/activate-account', verifyAccessToken, async (req, res) => {
  const { sub } = req.verifiedData;

  const user = await User.findById(sub);
  if (!user) return res.status(404).json('User not found');
  if (user.isVerified) return res.status(200).json('Account has previously been activated');

  try {
    user.isVerified = true;
    await user.save();

    return res.status(200).json('Account activate is now activated');
  } catch (err) {
    return res.status(400).json('Unable to update the status of your account');
  }
});

module.exports = router;
