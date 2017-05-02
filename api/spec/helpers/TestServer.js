const app = require('../../index.js');

class TestServer {
  start(port) {
    this.server = app.listen(port);
  }

  stop() {
    this.server.close();
  }
}

module.exports = TestServer;
