'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = express();

// -- IMPORT ROUTES -- \\
const pingRoute = require("./routes/ping");
const authRoute = require("./routes/auth");

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());

// -- CORS -- \\
api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//  -- ROUTING -- \\
api.use('/', pingRoute);
api.use('/', authRoute);

const port = process.env.PORT || 8080;

api.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
