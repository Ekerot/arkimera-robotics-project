const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const createError = require('http-errors');

const jwtAuth = require('./jwtAuth');
// -- IMPORT ROUTES -- \\
const pingRoutes = require('./routes/ping');
const authRoutes = require('./routes/auth');
const companiesRoutes = require('./routes/companies');

const app = express();

// -- MIDDLEWARE -- \\
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jwtAuth.checkAuth); // checks body so must be after bodyparser
app.use(cors());

app.use((req, res, next) => {
  res.customSend = (success, statusCode, data) => {
    const payload = {
      success,
      data,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    res.status(statusCode).json(payload);
  };

  next();
});

app.set('x-powered-by', false); // set so app do not leak implementation details

//  -- ROUTING -- \\
app.use('/', pingRoutes);
app.use('/', authRoutes);
app.use('/companies', jwtAuth.requireAuth, companiesRoutes);

// General 404 error is not specified in AzoraOne API documentation,
// but this is their response
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

// Express error middleware must have 4 args,
// so do not remove unused parameters even if eslint complains
app.use((error, req, res, next) => {
  let payload;
  if (Object.prototype.hasOwnProperty.call(error, 'payload')) {
    payload = error.payload;
  } else {
    payload =
    [{
      code: 0,
      message: error.message,
      details: '',
      element: '',
    }];
  }
  res.customSend(false, error.statusCode, payload);
});

module.exports = app;
