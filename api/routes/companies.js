const router = require('express').Router();
const a1axios = require('../azoraOneAxios');
const moment = require('moment');
const createError = require('http-errors');

moment.locale('sv');

function forwardToClient(res, response) {
  res.status(response.status).send(response.data);
}

function standardErrorHandling(res, error, next) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    next(createError(error.response.status, { payload: error.response.data }));
  } else if (error.request) {
    // The request was made but no response was received
    next(createError(500, 'No response from downstream API'));
  } else {
    // Something happened in setting up the request that triggered an Error
    next(createError(500, 'Error setting upp request to downstream API'));
  }
}

router.get('/', (req, res, next) => {
  // TODOS
  // Add logging the requests,
  // maybe change timestamp instead of just using what was received from AzoraOne???
  a1axios.get('student/api/companies').then((response) => {
    forwardToClient(res, response);
  }).catch((error) => {
    standardErrorHandling(res, error, next);
  });
});

router.put('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const companyID = req.params.companyID;
  const fileID = req.params.fileID;
  const body = req.body;
  const url = `student/api/companies/${companyID}/files/${fileID}/receipts`;

  // TODO add validation?
  a1axios.put(url, body).then((response) => {
    forwardToClient(res, response);
  }).catch((error) => {
    standardErrorHandling(res, error, next);
  });
});

module.exports = router;
