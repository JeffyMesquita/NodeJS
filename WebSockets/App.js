var io = require('socket.io')(3000);

io.on('connection', (socket) => {
   console.log('novo usuário conectado');

   socket.on('client_hello', (data) => {
      io.sockets.emit('server_hello', data);
   })
});