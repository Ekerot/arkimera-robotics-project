const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const createError = require('http-errors');

const mongoose = require('./config/mongoose');
const jwtAuth = require('./jwtAuth');
// -- IMPORT ROUTES -- \\
const pingRoutes = require('./routes/ping');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const companiesRoutes = require('./routes/companies');
const createFolders = require('./common/createFolders');

const app = express();
const dbName = 'arkimera';
mongoose(dbName);

createFolders();

//  -- STATIC FILES -- \\
app.use(cors());
// -- MIDDLEWARE -- \\
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/test', (req, res, next) => {
  console.log(req.body);
});
app.use(jwtAuth.checkAuth); // checks body so must be after bodyparser

app.use((req, res, next) => {
  res.customSend = (success, statusCode, data) => {
    // 'typeof x' will give object if null so we must check for it not being null as well
    // if (
    //   typeof success !== 'boolean' ||
    //   typeof statusCode !== 'number' ||
    //   (typeof data !== 'object' && data !== null)
    // ) {
      // throw new TypeError('Incorrect usage of customSend');
      if (typeof success !== 'boolean') {
        success = success || false;
      }
      if (isNaN(statusCode)) {
        statusCode = parseInt(statusCode);
      }
      if (typeof data !== 'object' && data !== null) {
        data = { data };
      }
    // }

    let message = '';

    if (!success) {
      message = data[0].message;
    }

    const payload = {
      success,
      data,
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
      code: statusCode,
      message,
    };

    res.status(statusCode).json(payload);
  };

  next();
});

app.set('x-powered-by', false); // set so app do not leak implementation details

//  -- ROUTING -- \\
app.use('/', pingRoutes);
app.use('/', authRoutes);
app.use('/', usersRoutes);
app.use('/companies', jwtAuth.requireAuth, companiesRoutes);

// General 404 error is not specified in AzoraOne API documentation,
// but this is their response
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

// Express error middleware must have 4 args,
// so do not remove unused parameters even if eslint complains
app.use((error, req, res, next) => {
  let data;
  if (Object.prototype.hasOwnProperty.call(error, 'payload')) {
    data = error.payload;
  } else {
    data = [
      {
        code: 0,
        message: error.message,
        details: '',
        element: '',
        error,
      },
    ];
  }
  const payload = {
    success: false,
    data,
    time: moment().format('YYYY-MM-DD hh:mm:ss'),
    code: error.statusCode,
    message: data[0].message,
  };

  res.status(500).json(payload);
});

module.exports = app;
