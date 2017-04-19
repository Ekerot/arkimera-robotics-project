'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = express();

const jwtAuth = require("./jwtAuth");

// -- IMPORT ROUTES -- \\
const pingRoutes = require('./routes/ping');
const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');
const companiesRoutes = require('./routes/companies');

// -- MIDDLEWARE -- \\
api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(jwtAuth.checkAuth); //checks body so must be after bodyparser

// -- CORS -- \\
api.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

api.set("x-powered-by", false); //set so api do not leak implementation details

//  -- ROUTING -- \\
api.use('/', pingRoutes);
api.use('/', authRoutes);
api.use('/', jwtAuth.requireAuth, filesRoutes);
api.use('/', jwtAuth.requireAuth, companiesRoutes);

const port = process.env.PORT || 8080;

api.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
