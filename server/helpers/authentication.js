const crypto = require('crypto');
const { randomBytes } = require('crypto');
const qs = require('querystring');

const algorithm = 'aes-256-ctr'
const key = process.env.TWO_FACTOR_ENCRYPTION_KEY
const iv = crypto.randomBytes(16);

const axios = require('axios');

let code_verifier;
let ssn = {};

const encryptSecret = (secret) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(secret), cipher.final()]);

  const ivToString = iv.toString('hex');
  const encryptedToString = encrypted.toString('hex')

  return `${ivToString}.${encryptedToString}`
}

const decryptSecret = (secret) => {
  const iv = secret.substr(0, secret.indexOf('.'));
  const encrypted = secret.substr(secret.indexOf(".") + 1);

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

  return decrpyted.toString();
}

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

    req.session.access_token = await access_token;

    return res.redirect('https://localhost:3000/loading');
  } catch (e) {
    console.log(error);
    // redirect to certain page if failed
  }
};

module.exports = { generateCodes, authenticateUser, encryptSecret, decryptSecret };
