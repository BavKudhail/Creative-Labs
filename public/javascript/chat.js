// get project ID
const project_id = document.getElementById("project-id").innerText;
console.log(project_id);
// get username of currently logged in user
const username = document.getElementById("username").innerText;
console.log(username);

// socket.io script tag in chat.handlebars gives us access to this function
const socket = io();
const messages = document.querySelector(".messages");

// chat form
const chatForm = document.getElementById("chat-form");

// Get message from server side and display to front-end
socket.on("message", (message) => {
  console.log(message);
  sendMessage(message);

  // scroll functionality
  messages.scrollTop = messages.scrollHeight;

  // clear the input
  document.getElementById("message").value = "";
  // focus on the empty input
  document.getElementById("message").focus();
});

// Message event handler
chatForm.addEventListener("submit", (event) => {
  // prevent the form from refreshing
  event.preventDefault();
  // get the value of the current message text input from #message ID

  // Get the value of the #message input field
  const message = document.getElementById("message").value;

  // Emit a message to the server
  socket.emit("userMessage", message);

  // Clear the user input
  event.target.getElementById;
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

// =========== below is old logic to revisit ==================

// join button
const joinBtn = document.getElementById("join-btn");

// logic when user clicks
const joinTheTeam = async () => {
  console.log("clicked button");

  const response = await fetch("/api/team", {
    method: "GET",
  });
  if (response.ok) {
    console.log("successfull");
  } else {
    alert(response.statusText);
  }
};

joinBtn.addEventListener("click", joinTheTeam);
