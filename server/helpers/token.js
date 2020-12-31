const JWT = require('jsonwebtoken');
const { verify } = require('jsonwebtoken')
const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_VERIFY_ACTIVATE_ACCOUNT_SECRET,
  JWT_RESET_PASSWORD_TOKEN_SECRET
} = process.env

function getSecret(type) {
  switch (type) {
    case 'activateAccount':
      return JWT_VERIFY_ACTIVATE_ACCOUNT_SECRET;
    case 'resetPassword':
      return JWT_RESET_PASSWORD_TOKEN_SECRET;
    default:
      return JWT_ACCESS_TOKEN_SECRET
  }
}

module.exports = {
  createAccessToken: (user) => {
    const { id: userId, tokenVersion } = user;
    return JWT.sign({ userId, tokenVersion }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
  },

  createRefreshToken: (user) => {
    const { id: userId, tokenVersion } = user;
    return JWT.sign({ userId, tokenVersion }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
  },

  createActivateAccountToken: userId => {
    return JWT.sign({ userId }, JWT_VERIFY_ACTIVATE_ACCOUNT_SECRET, { expiresIn: "60m" })
  },

  createResetPasswordToken: userId => {
    return JWT.sign({ userId }, JWT_RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "30m" })
  },

  validateToken: (req, res, next) => {
    let type;

    if (res.locals.type) {
      type = res.locals.type
    } else {
      type = 'accessToken'
    }

    const secret = getSecret(type);

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(401).json('Access deined');

    try {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1].toString();

      const verifiedData = verify(bearerToken, secret)
      req.verifiedData = verifiedData;

      return next();
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Invalid token')
    }
  }
}