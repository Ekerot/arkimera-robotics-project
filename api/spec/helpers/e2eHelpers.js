const request = require('request');

function setupRequestAndExpectsRunner(options) {
  return (inputData, done, expectsCallback) => {
    const modifiedOptions = Object.assign({ body: inputData }, options);
    request(modifiedOptions, (err, res, body) => {
      expectsCallback(res, body);
      done();
    });
  };
}

module.exports = {
  setupRequestAndExpectsRunner,
};
