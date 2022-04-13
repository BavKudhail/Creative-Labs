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
// input field value
const input = document.getElementById("input");

console.log(user_id);
console.log(username);

// chat forn
chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //   if there is a value in the input - emit value when you press send
  if (input.value) {
    //   this private message is the key - different from the chat message
    socket.emit("joinPrivateChat", input.value);
    // after emit - clear the input field
    input.value = "";
  }
});

// create and append message to front-end
socket.on("joinPrivateChat", function (message) {
  console.log(message);
  // message text
  const messageText = $(`<div class="message">
  <p class="meta"> ${username} &nbsp <span> time </span></p>
						<p class="text">
							${message}
						</p>
</div>`);

  // append message text to .messages parent div
  $(".messages").append(messageText);
});
