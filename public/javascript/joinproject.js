console.log("hello");

// When you click on join the project

const joinBtn = document.getElementById("join-team-btn");

// project form handler
const joinTheProject = async (event) => {
  event.preventDefault();
  console.log("clicked");
};

joinBtn.addEventListener("click", joinTheProject);

// When a user clicks join the chat
// Get the values of that project that was clicked on -
// Send a POST request to create a new project with the title and description values of
// the current object clicks
