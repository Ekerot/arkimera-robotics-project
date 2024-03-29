const router = require('express').Router();
const Payload = require('../common/Payload');

const createToken = require('../jwtAuth').createToken;
const User = require('../interfaces/User.js');

router.post('/users/auth', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  User.verifyPassword(user)
    .then((result) => {
      const jwt = createToken(result);
      res.status(200).send(new Payload(true, 200, { token: jwt }));
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
