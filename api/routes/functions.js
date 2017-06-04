const request = require('request');
const createError = require('http-errors');

const socket = require('../common/socket');
const Files = require('../interfaces/Files');

const functions = {
  extractReceipt: (url, fileID, decoded) =>
    new Promise((resolve, reject) => {
      const startTime = Date.now(); // Timer for the execution time
      request.get({ url, headers: decoded.headers }, (err, response, body) => {
        if (err) {
          return reject({ statusCode: 500, message: err });
        }

        const parsedBody = JSON.parse(body);
        if (response.statusCode === 412) {
          return reject({
            statusCode: response.statusCode,
            message: parsedBody.data[0].message,
          });
        }

        Files.update({
          fileID,
          status: 'extracted',
          extractedData: parsedBody.data,
          extractionTime: Date.now() - startTime,
        })
          .then(() =>
            resolve({ statusCode: response.statusCode, body: parsedBody }),
          )
          .catch(error => reject({ statusCode: 500, message: error }));
      });
    }),

  standardErrorHandling: (res, error, next) => {
    if (error.response) {
      next(
        createError(error.response.status, {
          payload: error.response.data.data,
        }),
      );
    } else if (error.request) {
      next(createError(500, 'No response from downstream API'));
    } else {
      next(createError(500, 'Error setting upp request to downstream API'));
    }
  },

  /**
   * Polling function.
   * Recommended to replace with webhook functionality and websocket event emitter.
   */
  poll: (url, fileID, decoded, time) => {
    let timeout = time || 1000;
    setTimeout(() => {
      functions
        .extractReceipt(url, fileID, decoded)
        .then(() => {
          socket.emit('extracted', fileID, decoded.username);
        })
        .catch(() => {
          timeout += 1000;
          functions.poll(url, fileID, decoded, timeout);
        });
    }, timeout);
  },
};

module.exports = functions;
