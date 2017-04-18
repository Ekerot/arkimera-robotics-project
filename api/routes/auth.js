'use strict';

const router = require('express').Router();

router.post('/users/auth', (req, res) => {

    let user = {
        username: req.body.username,
        password: req.body.password
    }

    if (user.username === "" || user.password === "") {
        return res.json({status: "fail", message: "Missing username and/or password"});
    }

    if (user.username === "admin" && user.password === "admin") {
        var jwt = "random-string-as-jwt";
        return res.json({status: "success", message: "Successfully logged in"});
    }

    return res.status(401).send({status: "fail", message: "Unauthorized"});
});

module.exports = router;