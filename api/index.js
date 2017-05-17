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
const Payload = require('./common/Payload');

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
// TEMPORARY TEST ROUTE
app.use('/test', (req, res, next) => {
  console.log(req.body);
});
// -------------------
app.use(jwtAuth.checkAuth);

app.use((req, res, next) => {
  res.customSend = (success, statusCode, data) => {
    if (
      typeof success !== 'boolean' ||
      typeof statusCode !== 'number' ||
      (typeof data !== 'object' && data !== null)
    ) {
      throw new TypeError('Incorrect usage of customSend');
    }

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

app.set('x-powered-by', false);

//  -- ROUTING -- \\
app.use('/', pingRoutes);
app.use('/', authRoutes);
app.use('/', usersRoutes);
app.use('/companies', jwtAuth.requireAuth, companiesRoutes);

// General 404 error
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

/**
 * @param next - required! 4 params must be present for Express error handling
 */
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
  const payload = new Payload(false, error.statusCode || 500, data);
  res.status(error.statusCode || 500).send(payload);
});

module.exports = app;
