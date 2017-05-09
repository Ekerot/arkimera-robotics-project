const jwt = require('jsonwebtoken');

const app = require('../../index.js');
const e2eHelpers = require('../helpers/e2eHelpers');


const setupRequestAndExpectsRunner = e2eHelpers.setupRequestAndExpectsRunner;
const responseFormatAsserts = e2eHelpers.responseFormatAsserts;


describe('testing /users/auth route', () => {
  let server;

  beforeEach(() => {
    server = app.listen(8081);
  });

  afterEach(() => {
    server.close();
  });

  const options = {
    url: 'http://localhost:8081/users/auth',
    method: 'POST',
    json: true,
  };

  const requestAndExpectsRunner = setupRequestAndExpectsRunner(options);

  describe('Fail due to missing info ', () => {
    const expectedResult = {
      success: false,
      message: 'Missing username and/or password',
      code: 400,
    };
    const missingInfoExpects = responseFormatAsserts(expectedResult);

    it('empty username&pw = fail & missing info msg', (done) => {
      const data = {
        username: '',
        password: '',
      };

      requestAndExpectsRunner(data, done, missingInfoExpects);
    });

    it('empty pw = fail & missing info msg', (done) => {
      const data = {
        username: 'admin',
        password: '',
      };
      requestAndExpectsRunner(data, done, missingInfoExpects);
    });

    it('empty username = fail & missing info msg', (done) => {
      const data = {
        username: '',
        password: 'admin',
      };
      requestAndExpectsRunner(data, done, missingInfoExpects);
    });

    it('unset username&pw = fail & missing info msg', (done) => {
      const data = {

      };
      requestAndExpectsRunner(data, done, missingInfoExpects);
    });
  });

  describe('Fail due to incorrect login info, Unauthorized', () => {
    const expectedResult = {
      success: false,
      message: 'Unauthorized',
      code: 401,
    };
    const unauthorizedExpects = responseFormatAsserts(expectedResult);

    it('incorrect username = fail', (done) => {
      const data = {
        username: 'wrong',
        password: 'admin',
      };
      requestAndExpectsRunner(data, done, unauthorizedExpects);
    });

    it('incorrect password = fail', (done) => {
      const data = {
        username: 'admin',
        password: 'wrong',
      };
      requestAndExpectsRunner(data, done, unauthorizedExpects);
    });
  });

  describe('Successfully logged in', () => {
    const expectedResult = {
      success: true,
      message: '',
      code: 200,
    };

    it('correct username&pw = success  & jsonwebtoken', (done) => {
      const data = {
        username: 'admin',
        password: 'admin',
      };

      requestAndExpectsRunner(data, done, (res, body) => {
        responseFormatAsserts(expectedResult, () => {
          expect(typeof body.data).toBe('object');
          expect(typeof body.data.token).toBe('string');
          const decoded = jwt.decode(body.data.token);
          expect(decoded.username).toBe(data.username);
        });
      });
    });
  });
});
