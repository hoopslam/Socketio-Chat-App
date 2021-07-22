import { io } from "socket.io-client";

//Make connection
const socketio = io("http://localhost:4000");

//Query DOM
const message = <HTMLInputElement>document.getElementById("message");
const handle = <HTMLInputElement>document.getElementById("name");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

//Emit Events
btn.addEventListener("click", () => {
  socketio.emit("chat", {
    handle: handle.value,
    message: message.value,
  });
});

message.addEventListener("keypress", () => {
  socketio.emit("typing", handle.value);
});

//Listen for Events
socketio.on("chat", (data) => {
    console.log(data)
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});

socketio.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
  setTimeout(() => {
    feedback.innerHTML = "";
  }, 3000);
});
