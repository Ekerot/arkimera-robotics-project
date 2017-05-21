const app = require('./index.js');
const http = require('http');
const socket = require('./common/socket');

const api = http.createServer(app);
socket.init(api);
const port = process.env.PORT || 8080;

api.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
