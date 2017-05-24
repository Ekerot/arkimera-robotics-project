const router = require('express').Router();
const Payload = require('../common/Payload');

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

  console.log(user);

  User.addNew(user)
    .then((result) => {
      const jwt = createToken(result);
      res.status(201).send(new Payload(true, 201, { token: jwt }));
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
