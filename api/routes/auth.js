const router = require('express').Router();
const createToken = require('../jwtAuth').createToken;
const createError = require('http-errors');

router.post('/users/auth', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!user.username || !user.password) {
    next(createError(401, 'Missing username and/or password'));
  } else if (user.username === 'admin' && user.password === 'admin') {
    const jwt = createToken(user.username);
    res.customSend(true, 200, { token: jwt });
  } else {
    next(createError(401, 'Unauthorized'));
  }
});

module.exports = router;
