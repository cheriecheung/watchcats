const JWT = require('jsonwebtoken');
const { verify } = require('jsonwebtoken')
const { JWT_VERIFY_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, VERIFY_EMAIL_TOKEN_SECRET, RESET_PASSWORD_TOKEN_SECRET } = process.env

module.exports = {
  createAccessToken: (user) => {
    const { id: userId, tokenVersion } = user;
    return JWT.sign({ userId, tokenVersion }, ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
  },

  createRefreshToken: (user) => {
    const { id: userId, tokenVersion } = user;
    return JWT.sign({ userId, tokenVersion }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
  },

  createVerifyEmailToken: userId => {
    return JWT.sign({ userId }, VERIFY_EMAIL_TOKEN_SECRET, { expiresIn: "60m" })
  },

  createResetPasswordToken: userId => {
    return JWT.sign({ userId }, RESET_PASSWORD_TOKEN_SECRET, { expiresIn: "30m" })
  },

  // 24 hours, for verify email and reset password
  verifyAccessToken: (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(401).json('Access deined');

    try {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1].toString();
      const verifiedData = JWT.verify(bearerToken, JWT_VERIFY_SECRET)
      req.verifiedData = verifiedData;

      return next();
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Invalid token')
    }
  },

  verifyAccessTokenUpdate: (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(401).json('Access deined');

    try {
      const bearer = bearerHeader.split(' ');
      const accessToken = bearer[1].toString();

      const verifiedData = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      req.verifiedData = verifiedData;

      return next();
    } catch (err) {
      console.log({ err })
      return res.status(401).json('Invalid token')
    }
  },

  // register
  signAccessToken: (user, secret) => {
    const now = Math.floor(Date.now() / 1000);

    return JWT.sign(
      {
        iss: 'FindPetSitter',
        sub: user.id,
        iat: now,

        // for activating account and reset password
        exp: now + 60 * 60 * 24
      },
      secret
    );
  }
};
