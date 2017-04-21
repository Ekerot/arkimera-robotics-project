const router = require('express').Router();
const a1axios = require('../azoraOneAxios');
const moment = require('moment');

moment.locale('sv');

function forwardToClient(res, response) {
  res.status(response.status).send(response.data);
}

function standardErrorHandling(res, error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.status(error.response.status).send(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    res.status(500).send(
      {
        success: false,
        data: [{
          code: 0,
          message: 'No response from downstream API',
          details: '',
          element: '',
        }],
        time: moment().format('YYYY-MM-DD hh:mm:ss'),
      },
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    res.status(500).send(
      {
        success: false,
        data: [{
          code: 0,
          message: 'Error setting upp request to downstream API',
          details: '',
          element: '',
        }],
        time: moment().format('YYYY-MM-DD hh:mm:ss'),
      },
    );
  }
  console.log(error.config);
}

router.get('/companies', (req, res) => {
  // TODOS
  // Add logging the requests,
  // maybe change timestamp instead of just using what was received from AzoraOne???
  a1axios.get('student/api/companies').then((response) => {
    forwardToClient(res, response);
  }).catch((error) => {
    standardErrorHandling(res, error);
  });
});

router.put('/companies/:companyID/files/:fileID/receipts', (req, res) => {
  const companyID = req.params.companyID;
  const fileID = req.params.fileID;
  const body = req.body;
  const url = `student/api/companies/${companyID}/files/${fileID}/receipts`;

  // TODO add validation?
  a1axios.put(url, body).then((response) => {
    forwardToClient(res, response);
  }).catch((error) => {
    standardErrorHandling(res, error);
  });
});

module.exports = router;
