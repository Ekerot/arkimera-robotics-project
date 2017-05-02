const router = require('express').Router();

router.get('/ping', (req, res) => {
  res.customSend(true, 200, { answer: 'pong' });
});

module.exports = router;
