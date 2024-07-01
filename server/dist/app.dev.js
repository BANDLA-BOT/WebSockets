"use strict";

var express = require('express');

var http = require('http');

var cors = require('cors');

var _require = require('socket.io'),
    Server = _require.Server;

var app = express();
app.use(cors());
server = http.createServer(app);
var io = new Server(server, {
  cors: {
    methods: ['GET', 'POST'],
    origin: 'http://localhost:5173'
  }
});
io.on("connection", function (socket) {
  console.log(" User connected: ".concat(socket.id));
  socket.on('join_room', function (data) {
    socket.join(data);
    console.log("User with id : ".concat(socket.id, " Joined room : ").concat(data));
  });
  socket.on("send_message", function (data) {
    socket.to(data.room).emit("receive_messsage", data);
    console.log(data);
  });
  socket.on('disconnected', function () {
    console.log('User disconnected', socket.id);
  });
});
server.listen(8000, function () {
  console.log("Server is running on 8000");
});
//# sourceMappingURL=app.dev.js.map
