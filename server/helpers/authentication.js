const crypto = require('crypto');
const { randomBytes } = require('crypto');
const algorithm = 'aes-256-ctr'
const key = process.env.TWO_FACTOR_ENCRYPTION_KEY
const iv = crypto.randomBytes(16);

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

  function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
  }

  const codeVerifier = base64URLEncode(crypto.randomBytes(43));
  const codeChallenge = base64URLEncode(sha256(codeVerifier));
  const csrfToken = randomBytes(100).toString('base64');

  req.code_challenge = codeChallenge;
  req.code_verifier = codeVerifier;
  req.csrf_token = csrfToken;

  return next();
};

module.exports = {
  generateCodes,
  encryptSecret,
  decryptSecret
};
