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

// join private chat based on the user ID and
socket.emit("joinPrivateChat", {
  username,
  user_id,
});

// catch message on client side
socket.on("message", (message) => {
  console.log(message);
  //   send message from server to client
  sendMessage(message);
  //   scroll functionality
  messages.scrollTop = messages.scrollHeight;
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // input field value
  const message = document.getElementById("message").value;

  //   emitting a private message to the users profile chat-box
  socket.emit("privateMessage", message);
});

// Send message to client side
function sendMessage(message) {
  // message text
  const messageText = $(`<div class="message">
  <p class="meta">${username}: </p>
						<p class="text">
							${message}
						</p>
</div>`);

  // append message text to .messages parent div
  $(".messages").append(messageText);
}
