// Get variables from the DOM

// get project ID
const project_id = document.getElementById("project-id").innerText;
// get username of currently logged in user
const username = document.getElementById("username").innerText;
// get user list of users currently on the chat page
const userList = document.getElementById("user-list");
// messages
const messages = document.querySelector(".messages");
// chat form
const chatForm = document.getElementById("chat-form");

console.log(userList);

// socket.io script tag in chat.handlebars gives us access to this function
const socket = io();

// Join the specific project chat room based on that the project_id and the username of the currently logged in user
socket.emit("joinProjectChat", {
  username,
  project_id,
});

// Get project and users
socket.on("projectUsers", ({ project_id, users }) => {
  // output the list of users to the front-end
  sendUsers(users);
});

// Get message from server side and display to front-end
socket.on("message", (message) => {
  sendMessage(message);

  // scroll functionality
  messages.scrollTop = messages.scrollHeight;

  // clear the current input field
  document.getElementById("message").value = "";
});

// Message event handler
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the value of the #message input field
  const message = document.getElementById("message").value;

  // Emit a message to the server
  socket.emit("userMessage", message);
});

// Output message to front-end (Is there a better way to do this? Handlebars / )
function sendMessage(message) {
  // message text
  const messageText = $(`<div class="message">
  <p class="meta">${message.username} &nbsp <span>${message.time}</span></p>
						<p class="text">
							${message.message}
						</p>
</div>`);

  // append message text to .messages parent div
  $(".messages").append(messageText);
}

// Add User information to the DOM
function sendUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li ">${user.username}</li>`).join("")}
  `;
}

// =========== below is old logic to revisit ==================

// join button
const joinBtn = document.getElementById("join-btn");

// logic when user clicks
const joinTheTeam = async () => {
  console.log("clicked button");
};

joinBtn.addEventListener("click", joinTheTeam);
