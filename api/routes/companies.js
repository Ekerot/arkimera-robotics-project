const fs = require('fs');
const router = require('express').Router();
const multer = require('multer');
const request = require('request');
const createError = require('http-errors');

const diskStorage = require('../common/diskStorage');
const Files = require('../interfaces/Files');
const functions = require('./functions');
const Payload = require('../common/Payload');

// CONFIG disk storage for multer file upload
const storage = multer.diskStorage(diskStorage);
const upload = multer({ storage });

/**
 * GET /companies
 *
 * Get list of companies from AzoraOne
 */
router.get('/', (req, res, next) => {
  const url = `https://azoraone.azure-api.net/${req.decoded.appUrl}/api/companies/`;
  request.get({ url, headers: req.decoded.headers }, (err, response, body) => {
    if (err) {
      return functions.standardErrorHandling(res, err, next);
    }

    const parsedBody = JSON.parse(body);
    return res
      .status(response.statusCode)
      .send(
        new Payload(parsedBody.success, response.statusCode, parsedBody.data),
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
  }

  Files.get(data)
    .then(files => res.status(200).send(new Payload(true, 200, files)))
    .catch(err => next(createError(500, err)));
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
  const url = `https://azoraone.azure-api.net/${req.decoded.appUrl}/api/companies/${companyID}/files`;
  request.post({ url, formData, headers: req.decoded.headers }, (err, response, body) => {
    if (err) {
      return Files.remove(file.path, () => {
        functions.standardErrorHandling(res, err, next);
      });
    }

    const parsedBody = JSON.parse(body);
    if (response.statusCode !== 202) {
      return fs.unlink(file.path, () => {
        next(createError(response.statusCode, parsedBody.data));
      });
    }

    // Temporary polling function to update database after receipt has been extracted.
    // Recommended to replace with webhook and websockets
    const pollUrl = `https://azoraone.azure-api.net/${req.decoded.appUrl}/api/companies/${companyID}/files/${fileID}/receipts`;
    functions.poll(pollUrl, fileID, req.decoded.username);
    // -------

    Files.move(file.path)
      .then((newPath) => {
        file.path = newPath;

        const data = {
          fileID,
          file,
          status: 'uploaded',
          username: req.decoded.username,
          companyID,
        };

        Files.save(data)
          .then(() =>
            res
              .status(response.statusCode)
              .send(
                new Payload(
                  parsedBody.success,
                  response.statusCode,
                  parsedBody.data,
                ),
              ),
          )
          .catch(error => next(createError(500, error)));
      })
      .catch((error) => {
        next(createError(500, error));
      });
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
    .then(file => res.status(200).send(new Payload(true, 200, file[0])))
    .catch(error => next(createError(500, error)));
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
    .then(file => res.status(200).send(new Payload(true, 200, file)))
    .catch(err => next(createError(500, err)));
});

/**
 * GET /companies/{companyID}/files/{fileID}/receipts
 *
 * Extract data from uploaded receipt
 */
router.get('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const fileID = req.params.fileID;
  const companyID = req.params.companyID;
  const url = `https://azoraone.azure-api.net/${req.decoded.appUrl}/api/companies/${companyID}/files/${fileID}/receipts`;

  functions
    .extractReceipt(url, fileID, req)
    .then((response) => {
      res
        .status(response.statusCode)
        .send(new Payload(true, response.statusCode, response.body));
    })
    .catch(error => next(createError(error.statusCode, error.message)));
});

/**
 * PUT /companies/{companyID}/files/{fileID}/receipts
 *
 * Bookkeeps the receipt
 */
router.put('/:companyID/files/:fileID/receipts', (req, res, next) => {
  const companyID = req.params.companyID;
  const fileID = req.params.fileID;
  const data = req.body;
  const url = `https://azoraone.azure-api.net/${req.decoded.appUrl}/api/companies/${companyID}/files/${fileID}/receipts`;

  request.put({ url, json: data, headers: req.decoded.headers }, (err, response, body) => {
    if (err) {
      return functions.standardErrorHandling(res, err, next);
    }

    if (response.statusCode !== 200) {
      return next(createError(response.statusCode, body));
    }

    Files.updateStatus({ fileID, bookedData: data, status: 'booked' })
      .then(() =>
        res
          .status(response.statusCode)
          .send(new Payload(body.success, response.statusCode, body.data)),
      )
      .catch(error => next(createError(500, error)));
  });
});

module.exports = router;
