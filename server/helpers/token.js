const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1].toString();
    // Set the token
    req.token = bearerToken;

    console.log(typeof req.token);
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

const signToken = (user, secret) => {
  return JWT.sign(
    {
      iss: 'FindPetSitter',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    secret
  );
};

module.exports = { verifyToken, signToken };
