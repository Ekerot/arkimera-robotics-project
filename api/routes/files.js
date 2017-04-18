'use strict';

const router = require('express').Router();

router.post('/companies/:companyID/files', (req, res) => {
    console.log(req.params);
    res.json({answer: "pong"});
});

module.exports = router;