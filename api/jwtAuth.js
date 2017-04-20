"use strict";

const jwt = require("jsonwebtoken");
const jwtSecret = require("./secrets.js").jwtSecret;

function checkAuth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                return res.status(401).send({status: "fail", message: "Provided token was not valid"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        next();
    }
};

function requireAuth(req, res, next) {
    //req.decoded = true; //REMOVE WHEN NOT TESTING!
    if (req.decoded) {
        next();
    } else {
        return res.status(401).send({status: "fail", message: "No token provided."});
    }
}

function createToken(username) {

    let infoToEncode = {
        username: username
    };

    let options = {
        expiresIn: "1d"
    }

    return jwt.sign(infoToEncode, jwtSecret, options);
}

module.exports = {checkAuth, requireAuth, createToken}