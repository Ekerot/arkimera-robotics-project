const request = require('request');
const createError = require('http-errors');

const socket = require('../common/socket');
const Files = require('../interfaces/Files');

let loop;

const functions = {
  extractReceipt: (url, fileID, req) =>
    new Promise((resolve, reject) => {
      request.get({ url, headers: req.decoded.headers }, (err, response, body) => {
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

        Files.updateStatus({
          fileID,
          status: 'extracted',
          extractedData: parsedBody.data,
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
  poll: (url, fileID, user, time) => {
    let timeout = time || 1000;
    loop = setTimeout(() => {
      functions
        .extractReceipt(url, fileID)
        .then((response) => {
          clearTimeout(loop);
          socket.emit('extracted', fileID, user);
        })
        .catch((error) => {
          timeout += 1000;
          functions.poll(url, fileID, user, timeout);
        });
    }, timeout);
  },
};

module.exports = functions;
