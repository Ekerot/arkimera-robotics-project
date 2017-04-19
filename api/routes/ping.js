'use strict';

const router = require('express').Router();

router.get('/ping', (req, res) => {
    res.json({answer: "pong"});
});

module.exports = router;