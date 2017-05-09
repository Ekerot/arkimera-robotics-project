const router = require('express').Router();
const createError = require('http-errors');

const createToken = require('../jwtAuth').createToken;
const User = require('../interfaces/User.js');

router.post('/users/auth', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!user.username || !user.password) {
    next(createError(401, 'Missing username and/or password'));
  } else {
    User.verifyPassword(user, (err, result) => {
      if (err) {
        if (err.message === 'No user with that username') {
          next(createError(401, 'Unauthorized'));
        } else {
          next(createError(500, 'Internal server error'));
        }
      } else if (result === true) {
        const jwt = createToken(user);
        res.customSend(true, 200, { token: jwt });
      } else {
        next(createError(401, 'Unauthorized'));
      }
    });
  }
});

module.exports = router;
