const crypto = require('crypto');
const { randomBytes } = require('crypto');

const generateCodes = () => {
  const base64URLEncode = (str) => {
    return str
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };
  const codeVerifier = base64URLEncode(crypto.randomBytes(43));

  function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
  }
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  const csrfToken = randomBytes(100).toString('base64');

  return { codeVerifier, codeChallenge, csrfToken };
};

module.exports = { generateCodes };
