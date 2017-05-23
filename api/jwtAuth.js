const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const jwtSecret = require('./secrets.js').jwtSecret;

function checkAuth(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return next(createError(401, 'Provided token was not valid'));
      }
      req.decoded = decoded;
      next();
    });
  } else {
    next();
  }
}

function requireAuth(req, res, next) {
  if (req.decoded) {
    return next();
  }
  return next(createError(401, 'No token provided.'));
}

function createToken(user) {
  const infoToEncode = {
    username: user.username,
    clientKey: user.clientKey,
    subscriptionKey: user.subscriptionKey,
    appUrl: user.appUrl,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(infoToEncode, jwtSecret, options);
}

module.exports = { checkAuth, requireAuth, createToken };
