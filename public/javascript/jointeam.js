// DOM variable
const joinTeamBtn = document.getElementById("join-team-btn");

const joinTeam = (event) => {
  event.preventDefault();

  //  get the current values of all of the roles

  // no of designers needed
  let designers_needed = document.getElementById("designers_needed").innerText;

  // no of developers needed
  let developers_needed =
    document.getElementById("developers_needed").innerText;

  // no of artist needed
  let artist_needed = document.getElementById("artist_needed").innerText;

  // get the current role of the user
  const myRole = document.getElementById("my-role").innerText;

  // if I am a designer and I join the chat, minus designer from the numbers
  if (myRole === "Designer") {
    designers_needed = designers_needed - 1;
  }
  // if I am a developer and I join the chat, minus developer from the numbers
  if (myRole === "Developer") {
    developers_needed = developers_needed - 1;
  }
  // if I am an artist and I join the chat, minus the artist from the numbers
  if (myRole === "3D Artist") {
    artist_needed = artist_needed - 1;
  }

  // send an PUT request to update the database

  console.log(designers_needed);
  console.log(developers_needed);
  console.log(artist_needed);
  console.log(myRole);
};

joinTeamBtn.addEventListener("click", joinTeam);

// When I click join the team,
// Minus my role from the categories available
// Update the categories
// Show the chat function

const leaveTeamBtn = document.getElementById("leave-team-btn");

const leaveTeam = () => {
  console.log("leave team");
};

leaveTeamBtn.addEventListener("click", leaveTeam);
