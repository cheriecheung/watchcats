const router = require('express').Router();
const JWT = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validation');
const passport = require('passport');
const User = require('../model/User');
const Member = require('../model/Member');
const { verifyAccessToken, signAccessToken } = require('../helpers/token');
const { generateCodes } = require('../helpers/authorizationCode');
const axios = require('axios');
const qs = require('querystring');

let code_verifier;
let code_challenge;
let ssn = {};

const generate = async (req, res, next) => {
  const { codeVerifier, codeChallenge, csrfToken } = await generateCodes();
  code_verifier = codeVerifier;
  code_challenge = codeChallenge;

  ssn = req.session;
  ssn.state = csrfToken;

  return next();
};

router.get('/googleOauth2', generate, async (req, res) => {
  const authenticationURI = `
    https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&scope=openid%20email&redirect_uri=${process.env.GOOGLE_OAUTH_CALLBACK_URL}&state=${ssn.state}&code_challenge=${code_challenge}&code_challenge_method=S256
  `;

  return res.status(200).json(authenticationURI);
});

router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state.split(' ').join('+');

  if (state !== ssn.state) {
    return res.status(401).json('Invalid state parameter');
  }

  const requestBody = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    code_verifier,
    grant_type: 'authorization_code',
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  await axios
    .post(
      'https://oauth2.googleapis.com/token',
      qs.stringify(requestBody),
      config
    )
    .then((response) => {
      console.log(response);
      return res.redirect('https://localhost:3000/find');
    })
    .catch((error) => {
      console.log(error);
      // redirect to certain page if failed
    });
});

router.get('/tokencallback', (req, res) => {
  console.log('youve come so far!');
});

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
    //if (error) return res.status(400).json(error.details[0].message);
    if (error)
      return res.status(400).json('Login failed; Invalid user ID or password.');

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
