const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const request = require('request');
const moment = require('moment');
const createError = require('http-errors');

const headers = require('../common/headers');
const diskStorage = require('../common/diskStorage');
const Files = require('../interfaces/Files');

moment.locale('sv');

// CONFIG disk storage for multer file upload
const storage = multer.diskStorage(diskStorage);
const upload = multer({ storage });

function standardErrorHandling(res, error, next) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    next(
      createError(error.response.status, { payload: error.response.data.data }),
    );
  } else if (error.request) {
    // The request was made but no response was received
    next(createError(500, 'No response from downstream API'));
  } else {
    // Something happened in setting up the request that triggered an Error
    next(createError(500, 'Error setting upp request to downstream API'));
  }
}

router.get('/', (req, res, next) => {
  const url = 'https://azoraone.azure-api.net/student/api/companies/';
  request.get({ url, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err, next);
    }

    const parsedBody = JSON.parse(body);
    return res.customSend(
      parsedBody.success,
      response.statusCode,
      parsedBody.data,
    );
  });
});

/**
 * GET /companies/{companyID}/files
 *
 * Get list of files from DB
 */
router.get('/:companyID/files', (req, res, next) => {
  const companyID = req.params.companyID;
  const data = {
    companyID,
  };

  if (req.query.status) {
    data.status = req.query.status;
    console.log(data.status);
  }

  Files.get(data)
    .then(files => res.customSend(true, 200, files))
    .catch(err => res.status(500).send(next(createError(500, err))));
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
  const formData = {
    FileID: fileID,
    File: fs.createReadStream(file.path),
  };
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/student/api/companies/${companyID}/files`;
  request.post({ url, formData, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err, next);
    }

    const data = {
      fileID,
      file,
      status: 'uploaded',
      username: req.decoded.username,
      companyID,
    };

    const parsedBody = JSON.parse(body);
    Files.save(data)
      .then(() => res.customSend(
          parsedBody.success,
          response.statusCode,
          parsedBody.data,
        ))
      .catch(error => res.status(500).send(next(createError(500, error))));
  });
});

/**
 * GET /companies/{companyID}/files/{fileID}
 *
 * Gets a single file
 */
router.get('/:companyID/files/:fileID', (req, res, next) => {
  const FileID = req.params.fileID;
  const data = {
    FileID,
  };

  Files.get(data)
    .then(file => res.customSend(true, 200, file))
    .catch(error => res.status(500).send(next(createError(500, error))));
});

/**
 * DELETE /companies/{companyID}/files/{fileID}
 *
 * Deletes a single file
 */
router.delete('/:companyID/files/:fileID', (req, res, next) => {
  const fileID = req.params.fileID;
  const data = {
    fileID,
  };

  Files.get(data)
    .then(file => res.customSend(true, 200, file))
    .catch(err => res.status(500).send(next(createError(500, err))));
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
    if (response.statusCode === 412) {
      return res
        .status(412)
        .send(next(createError(412, parsedBody.data[0].message)));
    }

    Files.updateStatus(fileID, 'extracted')
      .then(() =>
        res.customSend(parsedBody.success, response.statusCode, parsedBody.data),
      )
      .catch(error => res.status(500).send(next(createError(500, error))));
  });
});

router.put('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const companyID = req.params.companyID;
  const fileID = req.params.fileID;
  const data = req.body;
  const url = `student/api/companies/${companyID}/files/${fileID}/receipts`;

  request.post({ url, formData: data, headers }, (err, response, body) => {
    if (err) {
      return standardErrorHandling(res, err, next);
    }

    const parsedBody = JSON.parse(body);

    Files.updateStatus(fileID, 'booked')
      .then(() =>
        res.customSend(parsedBody.success, response.statusCode, parsedBody.data),
      )
      .catch(error => res.status(500).send(next(createError(500, error))));
  });
});

module.exports = router;
