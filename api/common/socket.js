const SocketIO = require('socket.io');

let io;

module.exports = {
  init: (api) => {
    io = new SocketIO(api);
  },
  emit: (event, data, user) => {
    console.log(`emits event: ${event} to ${user}`);
    io
    .of(`/sockets/${user}`)
    .on('connection', (socket) => {
      socket.emit(event, data);
    });
  },

  // TODO: DO NOT INCLUDE IN FINAL RELEASE JUST FOR CLIENT TO LOOK AT
  client: () => {
    // TODO: UNINSTALL FROM DEVDEPENDENCIES
    const client = require('socket.io-client')('http://localhost:8080/sockets/admin');
    const client2 = require('socket.io-client')('http://localhost:8080/sockets/adm');
    client.on('extracted', (data) => {
      console.log(`extracted data for file: ${data}`);
    });
    client.on('test', (data) => {
      console.log(data);
    });
    client2.on('test', (data) => {
      console.log(`client2 says he heard: "${data}"`);
    });
    client2.on('extracted', (data) => {
      console.log(`client2 says he heard: "${data}"`);
    });
  },
};
