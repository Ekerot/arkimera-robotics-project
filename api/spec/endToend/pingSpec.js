const request = require('request');
const app = require('../../index.js');

const url = 'http://localhost:8081/ping';

describe('testing ping route', () => {
  let server;

  beforeEach(() => {
    server = app.listen(8081);
  });

  afterEach(() => {
    server.close();
  });


  describe('GET', () => {
    it('should return status code 200', (done) => {
      request.get(url, (err, res) => {
        expect(err).toBe(null);
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('should return "pong" in body.answer', (done) => {
      request.get(url, (err, res, body) => {
        const answer = JSON.parse(body).answer;
        expect(answer).toBe('pong');
        done();
      });
    });
  });
});
