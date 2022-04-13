// Build the logic for user to user chat functionality
console.log("private chat has been connected");

// establish connection with socket.io
const socket = io();

const chatForm = document.getElementById("chat-form");
const input = document.getElementById("input");

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //   if there is a value in the input - emit value when you press send
  if (input.value) {
    //   this private message is the key - different from the chat message
    socket.emit("private message", input.value);
    // after emit - clear the input field
    input.value = "";
  }
});
