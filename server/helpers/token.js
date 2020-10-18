const JWT = require('jsonwebtoken');

const { JWT_VERIFY_SECRET } = process.env

const signAccessToken = (user, secret) => {
  const now = Math.floor(Date.now() / 1000);

  return JWT.sign(
    {
      iss: 'FindPetSitter',
      sub: user.id,
      iat: now,

      // for activating account
      exp: now + 60 * 60 * 24
    },
    secret
  );
};

const verifyAccessToken = (req, res, next) => {
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
    return res.status(400).json('Invalid token')
  }
};

const signRefreshToken = (user, secret) => {
  return JWT.sign(
    {
      iss: 'FindPetSitter',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 15), // current time + 30 day ahead
    },
    secret
  );
};

module.exports = { signAccessToken, verifyAccessToken, signRefreshToken };
