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

function responseFormatAsserts(expectedResult, extraAsserts) {
  return (res, body) => {
    expect(res.statusCode).toBe(expectedResult.code);

    expect(body.code).toBe(expectedResult.code);
    expect(body.success).toBe(expectedResult.success);
    expect(body.message).toBe(expectedResult.message);
    expect(typeof body.time).toBe('string');
    if (extraAsserts) extraAsserts(res, body);
  };
}

module.exports = {
  setupRequestAndExpectsRunner,
  responseFormatAsserts,
};
