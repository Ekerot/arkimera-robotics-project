const jwt = require('jsonwebtoken');

const app = require('../../index.js');
const setupRequestAndExpectsRunner = require('../helpers/e2eHelpers').setupRequestAndExpectsRunner;


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

  function simpleExpects(expectedResult) {
    return (res, body) => {
      expect(res.statusCode).toBe(expectedResult.statusCode);
      expect(body).toEqual(expectedResult.body);
    };
  }

  describe('Fail due to missing info ', () => {
    const expectedResult = {
      statusCode: 401,
      body: {
        success: false,
        message: 'Missing username and/or password',
      },
    };
    const missingInfoExpects = simpleExpects(expectedResult);

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
      statusCode: 401,
      body: {
        success: false,
        message: 'Unauthorized',
      },
    };
    const unauthorizedExpects = simpleExpects(expectedResult);

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
      statusCode: 200,
      body: {
        success: true,
        message: 'Successfully logged in',
      },
    };

    it('correct username&pw = success  & jsonwebtoken', (done) => {
      const data = {
        username: 'admin',
        password: 'admin',
      };
      requestAndExpectsRunner(data, done, (res, body) => {
        expect(res.statusCode).toBe(expectedResult.statusCode);
        expect(body.message).toBe(expectedResult.body.message);
        expect(typeof body.data).toBe('object');
        expect(typeof body.data.token).toBe('string');
        const decoded = jwt.decode(body.data.token);
        expect(decoded.username).toBe(data.username);
      });
    });
  });
});
