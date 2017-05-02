const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const request = require('request');
const moment = require('moment');
const createError = require('http-errors');

const headers = require('../common/headers');
const diskStorage = require('../common/diskStorage');
const a1axios = require('../azoraOneAxios');


moment.locale('sv');

// CONFIG disk storage for mutler file upload
const storage = multer.diskStorage(diskStorage);
const upload = multer({ storage });

function forwardToClient(res, response) {
  res.customSend(response.data.success, response.status, response.data.data);
}

function standardErrorHandling(res, error, next) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    next(createError(error.response.status, { payload: error.response.data.data }));
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
  a1axios
    .get('student/api/companies')
    .then((response) => {
      forwardToClient(res, response);
    })
    .catch((error) => {
      standardErrorHandling(res, error, next);
    });
});

/**
 * GET /companies/{companyID}/files
 *
 * Get list of files from DB
 */
router.get('/:compnayID/files', (req, res, next) => {
  const companyID = req.params.companyID;
  let data = {};

  if (req.query.statusID) {
    const statusID = req.query.statusID;
    console.log(statusID);
  }

  return res.status(200).send({ status: 'success', files: [] });
});

/**
 * POST /companies/{companyID}/files
 *
 * Upload files to AzoraOne API for analysis.
 * Uses multer upload to extract file uploaded from form data.
 */
router.post('/:companyID/files', upload.single('File'), (req, res, next) => {
  const file = req.file;
  const fileIDWithEncType = req.file.filename.split('-')[1];
  const fileID = fileIDWithEncType.split('.')[0];
  const data = {
    FileID: fileID,
    File: fs.createReadStream(file.path),
  };
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/student/api/companies/${companyID}/files`;

  request.post({ url, formData: data, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err, next);
    }

    const parsedBody = JSON.parse(body);
    return res.customSend(parsedBody.success, response.statusCode, parsedBody.data);
  });
});

/**
 * GET /companies/{companyID}/files/{fileID}
 *
 * Gets a single file
 */
router.get('/:companyID/files/:fileID', (req, res, next) => {
  const companyID = req.params.companyID;
  return res.status(200).send({ status: 'success', file: {} });
});

/**
 * DELETE /companies/{companyID}/files/{fileID}
 *
 * Deletes a single file
 */
router.delete('/:companyID/files/:fileID', (req, res, next) => {
  const companyID = req.params.companyID;
  return res.status(200).send({ status: 'success', file: {} });
});

/**
 * GET /companies/{companyID}/files/{fileID}/receipts
 *
 * Extract data from uploaded receipt
 */
router.get('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const fileID = req.params.fileID;
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/student/api/companies/${companyID}/files/${fileID}/receipts`;

  request.get({ url, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err, next);
    }

    const parsedBody = JSON.parse(body);
    return res.customSend(parsedBody.success, response.statusCode, parsedBody.data);
  });
});

router.put('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const companyID = req.params.companyID;
  const fileID = req.params.fileID;
  const body = req.body;
  const url = `student/api/companies/${companyID}/files/${fileID}/receipts`;

  // TODO add validation?
  a1axios
    .put(url, body)
    .then((response) => {
      forwardToClient(res, response);
    })
    .catch((error) => {
      standardErrorHandling(res, error, next);
    });
});

module.exports = router;
