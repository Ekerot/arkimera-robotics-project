const router = require('express').Router();
const createToken = require('../jwtAuth').createToken;

router.post('/users/auth', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!user.username || !user.password) {
    return res.status(401).json({ success: false, message: 'Missing username and/or password' });
  }

  if (user.username === 'admin' && user.password === 'admin') {
    const jwt = createToken(user.username);
    return res.json({ success: true, message: 'Successfully logged in', data: { token: jwt } });
  }

  return res.status(401).send({ success: false, message: 'Unauthorized' });
});

module.exports = router;
