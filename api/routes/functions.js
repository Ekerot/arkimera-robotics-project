const request = require('request');
const createError = require('http-errors');

const headers = require('../common/headers');
const Files = require('../interfaces/Files');

const functions = {
  extractReceipt: (url, fileID) =>
    new Promise((resolve, reject) => {
      request.get({ url, headers }, (err, response, body) => {
        if (err) {
          reject({ statusCode: 500, message: err });
        }

        const parsedBody = JSON.parse(body);
        if (response.statusCode === 412) {
          reject({
            statusCode: response.statusCode,
            message: parsedBody.data[0].message,
          });
        }

        Files.updateStatus(fileID, 'extracted')
          .then(() =>
            resolve({ statusCode: response.statusCode, body: parsedBody }),
          )
          .catch((error) => {
            reject({ statusCode: 500, message: error });
          });
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
  poll: (url, fileID, time) => {
    let timeout = time || 1000;
    let loop;
    functions
      .extractReceipt(url, fileID)
      .then((response) => {
        console.log('Finally got it!');
        clearTimeout(loop);
      })
      .catch((error) => {
        loop = setTimeout(() => {
          console.log('One more round on the merry go round');
          console.log(`Timer was ${timeout}`);
          timeout += 1000;
          console.log(`Next timer set to: ${timeout}`);
          functions.poll(url, fileID, timeout);
        }, timeout);
      });
  },
};

module.exports = functions;
