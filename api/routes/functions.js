const request = require('request');
const createError = require('http-errors');

const headers = require('../common/headers');
const Files = require('../interfaces/Files');

module.exports = {
  extractReceipt: (url, fileID, res, next) => {
    request.get({ url, headers }, (err, response, body) => {
      if (err) {
        return this.standardErrorHandling(res, err, next);
      }

      const parsedBody = JSON.parse(body);
      if (response.statusCode === 412) {
        return res
          .status(412)
          .send(next(createError(412, parsedBody.data[0].message)));
      }

      Files.updateStatus(fileID, 'extracted')
        .then(() =>
          res.customSend(
            parsedBody.success,
            response.statusCode,
            parsedBody.data,
          ),
        )
        .catch(error => res.status(500).send(next(createError(500, error))));
    });
  },

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

  poll: (url, fileID) => {
    let timeout = 1000;
    setTimeout(() => {
      request.get({ url, headers }, (err, response, body) => {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
          console.log(body);
        }
      });
    }, timeout);
  },
};
