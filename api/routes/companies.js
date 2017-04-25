const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const request = require('request');
const moment = require('moment');
const headers = require('../common/headers');
const diskStorage = require('../common/diskStorage');
const a1axios = require('../azoraOneAxios');

moment.locale('sv');

// CONFIG disk storage for mutler file upload
const storage = multer.diskStorage(diskStorage);
const upload = multer({ storage });

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

/**
 * POST /companies/:companyID/files
 *
 * Upload files to AzoraOne API for analysis.
 * Uses multer upload to extract file uploaded from form data.
 */
router.post('/companies/:companyID/files', upload.single('File'), (req, res) => {
  const file = req.file;
  const data = {
    FileID: Date.now(),
    File: fs.createReadStream(file.path),
  };
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/student/api/companies/${companyID}/files`;
  request.post({ url, formData: data, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err);
    }
    console.log(response);
    // Doesn't match forwardToClient
    return res.status(response.statusCode).send(JSON.parse(body));
  });
});

/**
 * GET /companies/{companyID}/files/{fileID}/receipts
 *
 * Extract data from uploaded receipt
 */
router.get('/companies/:companyID/files/:fileID/receipts', (req, res) => {
  const fileID = req.params.fileID;
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/student/api/companies/${companyID}/files/${fileID}/receipts`;

  request.get({ url, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err);
    }
    console.log(response);
    console.log(body);
    return res.status(response.statusCode).send(JSON.parse(body));
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
