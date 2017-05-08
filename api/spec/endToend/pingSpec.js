const app = require('../../index.js');
const e2eHelpers = require('../helpers/e2eHelpers');


const setupRequestAndExpectsRunner = e2eHelpers.setupRequestAndExpectsRunner;
const responseFormatAsserts = e2eHelpers.responseFormatAsserts;

describe('testing /ping route', () => {
  let server;

  beforeEach(() => {
    server = app.listen(8081);
  });

  afterEach(() => {
    server.close();
  });

  const options = {
    url: 'http://localhost:8081/ping',
    method: 'GET',
    json: true,
  };

  const requestAndExpectsRunner = setupRequestAndExpectsRunner(options);

  describe('GET /pong', () => {
    it('should return status code 200 and message pong', (done) => {
      const expectedResult = {
        success: true,
        message: '',
        code: 200,
      };

      requestAndExpectsRunner(null, done, (res, body) => {
        responseFormatAsserts(expectedResult, () => {
          expect(body.data.answer).toBe('pong');
        });
      });
    });
  });
});
