"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
//Make connection
var socketio = socket_io_client_1.io("http://localhost:4000");
//Query DOM
var message = document.getElementById("message");
var handle = document.getElementById("name");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
//Emit Events
btn.addEventListener("click", function () {
    socketio.emit("chat", {
        handle: handle.value,
        message: message.value
    });
});
message.addEventListener("keypress", function () {
    socketio.emit("typing", handle.value);
});
//Listen for Events
socketio.on("chat", function (data) {
    console.log(data);
    feedback.innerHTML = "";
    output.innerHTML +=
        "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});
socketio.on("typing", function (data) {
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
    setTimeout(function () {
        feedback.innerHTML = "";
    }, 3000);
});
