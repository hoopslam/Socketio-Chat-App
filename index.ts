const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();
const server = app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

//Static files
app.use(express.static("public"));

//Socket setup
const ioserver = socket(server);

ioserver.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  //listen to "chat", receive data and emit back to all sockets connected
  socket.on("chat", (data) => {
    ioserver.sockets.emit("chat", data);
    console.log(data);
  });

  //listen to "typing", broadcast back to all sockets connected except this one
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
