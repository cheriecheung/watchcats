const crypto = require('crypto');
const { randomBytes } = require('crypto');
const axios = require('axios');
const qs = require('querystring');

let code_verifier;
let ssn = {};

const generateCodes = async (req, res, next) => {
  const base64URLEncode = (str) => {
    return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };
  const codeVerifier = base64URLEncode(crypto.randomBytes(43));

  function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
  }
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  const csrfToken = randomBytes(100).toString('base64');

  code_verifier = codeVerifier;

  req.code_challenge = codeChallenge;
  req.code_verifier = codeVerifier;
  req.state = csrfToken;

  ssn = req.session;
  ssn.state = csrfToken;

  return next();
};

const authenticateUser = async (req, res, next) => {
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

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', qs.stringify(requestBody), config);
    const { access_token, refresh_token } = data || {};

    console.log({ data })

    req.session.access_token = await access_token;
    req.session.refresh_token = await refresh_token;

    res.cookie('token', 'token_value_TESTING', { httpOnly: true });
    return res.redirect('https://localhost:3000/loading');
  } catch (e) {
    console.log(error);
    // redirect to certain page if failed
  }
};

module.exports = { generateCodes, authenticateUser };
