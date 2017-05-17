const router = require('express').Router();
const Payload = require('../common/Payload');

router.get('/ping', (req, res) => {
  res.status(200).send(new Payload(true, 200, { answer: 'pong' }));
});

module.exports = router;
