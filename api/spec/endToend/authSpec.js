const request = require('request');
const app = require('../../index.js');
const jwt = require('jsonwebtoken');

describe('testing /users/auth route', () => {
  let server;

  beforeEach(() => {
    server = app.listen(8081);
  });

  afterEach(() => {
    server.close();
  });

  // Should this function be refactored, extraCheck is not very pretty??
  function doRequest(inputData, expectedResult, done, extraCheck) {
    const options = {
      url: 'http://localhost:8081/users/auth',
      method: 'POST',
      json: true,
      body: inputData,
    };

    request(options, (err, res, body) => {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(expectedResult.statusCode);
      expect(body.success).toBe(expectedResult.success);
      expect(body.message).toBe(expectedResult.message);
      if (extraCheck) extraCheck(body);
      done();
    });
  }

  describe('Fail due to missing info ', () => {
    const expectedResult = {
      statusCode: 401,
      success: false,
      message: 'Missing username and/or password',
    };

    it('empty username&pw = fail & missing info msg', (done) => {
      const data = {
        username: '',
        password: '',
      };

      doRequest(data, expectedResult, done);
    });

    it('empty pw = fail & missing info msg', (done) => {
      const data = {
        username: 'admin',
        password: '',
      };
      doRequest(data, expectedResult, done);
    });

    it('empty username = fail & missing info msg', (done) => {
      const data = {
        username: '',
        password: 'admin',
      };
      doRequest(data, expectedResult, done);
    });

    it('unset username&pw = fail & missing info msg', (done) => {
      const data = {

      };
      doRequest(data, expectedResult, done);
    });
  });

  describe('Fail due to incorrect login info, Unauthorized', () => {
    const expectedResult = {
      statusCode: 401,
      success: false,
      message: 'Unauthorized',
    };

    it('incorrect username = fail', (done) => {
      const data = {
        username: 'wrong',
        password: 'admin',
      };
      doRequest(data, expectedResult, done);
    });

    it('incorrect password = fail', (done) => {
      const data = {
        username: 'admin',
        password: 'wrong',
      };
      doRequest(data, expectedResult, done);
    });
  });

  describe('Successfully logged in', () => {
    const expectedResult = {
      statusCode: 200,
      success: true,
      message: 'Successfully logged in',
    };

    it('correct username&pw = success  & jsonwebtoken', (done) => {
      const data = {
        username: 'admin',
        password: 'admin',
      };
      doRequest(data, expectedResult, done, (body) => {
        expect(typeof body.data).toBe('object');
        expect(typeof body.data.token).toBe('string');
        const decoded = jwt.decode(body.data.token);
        expect(decoded.username).toBe(data.username);
      });
    });
  });
});
