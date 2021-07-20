var express = require("express");
var socket = require("socket.io");

//App setup
var app = express();
var server = app.listen(4000, function () {
  console.log("Server listening on port 4000");
});

//Static files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  //listen to "chat", receive data and emit back to all sockets connected
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
    console.log(data);
  });

  //listen to "typing", broadcast back to all sockets connected except this one
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
