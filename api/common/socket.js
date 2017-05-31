const SocketIO = require('socket.io');

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
};
