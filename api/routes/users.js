const router = require('express').Router();
const createError = require('http-errors');

const createToken = require('../jwtAuth').createToken;
const User = require('../interfaces/User.js');

router.post('/users', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    subscriptionKey: req.body.subscriptionKey,
    clientKey: req.body.clientKey,
    appUrl: req.body.appUrl,
  };

  User.addNew(user, (err, newUser) => {
    if (err) {
      if (err.message === 'Missing username' ||
          err.message === 'Missing password') {
        next(createError(400, err.message));
      } else if (err.message === 'User already exists') {
        next(createError(403, err.message));
      } else {
        next(createError(500, 'Internal server error'));
      }
    } else if (newUser) {
      const jwt = createToken(newUser);
      res.customSend(true, 202, { token: jwt });
    } else {
      next(createError(500, 'Internal server error'));
    }
  });
});

module.exports = router;
