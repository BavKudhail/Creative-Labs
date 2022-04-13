// Build the logic for user to user chat functionality
console.log("private chat has been connected");

// establish connection with socket.io
const socket = io();
// get the user id
const user_id = document.getElementById("user-id").innerText;
// get username of currently logged in user
const username = document.getElementById("current-user").innerText;
// chat form
const chatForm = document.getElementById("chat-form");
// messages
const messages = document.querySelector(".messages");

// catch message on client side
socket.on("message", (message) => {
  console.log(message);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // input field value
  const message = document.getElementById("message").value;

  //   emitting a private message to the users profile chat-box
  socket.emit("privateMessage", message);
});
