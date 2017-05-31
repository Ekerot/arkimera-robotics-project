const SocketIO = require('socket.io');

// TODO: UNINSTALL FROM DEVDEPENDENCIES
const client = require('socket.io-client')('http://localhost:8080');
const client2 = require('socket.io-client')('http://localhost:8080/');

let io;

module.exports = {
  init: (api) => {
    io = new SocketIO(api);
    io.sockets.on('connection', (socket) => {
      socket.on('open channel', (channel) => {
        socket.join(channel);
      });
    });
  },
  emit: (event, data, user) => {
    io.sockets.in(user).emit(event, data);
  },

  // TODO: DO NOT INCLUDE IN FINAL RELEASE JUST FOR CLIENT TO LOOK AT
  client: () => {
    client.connect();
    client.on('connect', () => {
      client.emit('open channel', 'admin');
      client.on('extracted', (data) => {
        console.log(`extracted data for file: ${data}`);
      });
      client.on('test', (data) => {
        console.log(data);
      });
    });
    client2.on('test', (data) => {
      console.log(`client2 says he heard: "${data}"`);
    });
    client2.on('extracted', (data) => {
      console.log(`client2 says he heard: "${data}"`);
    });
  },
};
