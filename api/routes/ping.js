'use strict';

const router = require('express').Router();

router.get('/ping', (req, res) => {
    console.log("ping");
    res.json({answer: "pong"});
});

module.exports = router;