const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwtAuth = require('./jwtAuth');
const moment = require('moment');

const api = express();

// -- IMPORT ROUTES -- \\
const pingRoutes = require('./routes/ping');
const authRoutes = require('./routes/auth');
const companiesRoutes = require('./routes/companies');

// -- MIDDLEWARE -- \\
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(jwtAuth.checkAuth); // checks body so must be after bodyparser
api.use(cors());

api.set('x-powered-by', false); // set so api do not leak implementation details

//  -- ROUTING -- \\
api.use('/', pingRoutes);
api.use('/', authRoutes);
api.use('/companies', jwtAuth.requireAuth, companiesRoutes);

// General 404 error is not specified in AzoraOne API documentation,
// but this is their response
api.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Resource not found',
  });
});

// Express error middleware must have 4 args,
// so do not remove unused parameters even if eslint complains
api.use((error, req, res, next) => {
  let payload;
  if (Object.prototype.hasOwnProperty.call(error, 'payload')) {
    payload = error.payload;
  } else {
    payload = {
      success: false,
      data: [{
        code: 0,
        message: error.message,
        details: '',
        element: '',
      }],
      time: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
  }
  res.status(error.status).json(payload);
});

const port = process.env.PORT || 8080;

api.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
