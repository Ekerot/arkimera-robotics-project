'use strict';

const router = require('express').Router();
const createToken = require('../jwtAuth').createToken;

router.post('/users/auth', (req, res) => {

    let user = {
        username: req.body.username,
        password: req.body.password
    }

    if (user.username === "" || user.password === "") {
        return res.json({status: "fail", message: "Missing username and/or password"});
    }

    if (user.username === "admin" && user.password === "admin") {
        var jwt = createToken(user.username);
        return res.json({status: "success", message: "Successfully logged in", data: {token: jwt}});
    }

    return res.status(401).send({status: "fail", message: "Unauthorized"});

});

module.exports = router;