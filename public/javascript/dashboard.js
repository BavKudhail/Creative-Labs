// $(document).ready(function () {
//   $(".sidenav").sidenav();
// });

// $(document).ready(function () {
//   $("select").formSelect();
// });

// THIS WORKS ON THE CHAT PAGE BUT WON'T WORK HERE
// When this is linked to project-item.handlebars it stops the projects from rendering

const checkTeam = () => {
  // no of designers needed
  let designers_needed = document.getElementById("designers_needed").innerText;
  // no of developers needed
  let developers_needed =
    document.getElementById("developers_needed").innerText;
  // no of artist needed
  let artist_needed = document.getElementById("artist_needed").innerText;

  console.log("restriction function connected");
  if (
    designers_needed === 0 &&
    developers_needed === 0 &&
    artist_needed === 0
  ) {
    window.alert("This team is full!");
    return;
  }
};

const joinButton = document.getElementById("join-team-btn");
joinButton.addEventListener("click", checkTeam);
// //
// const profileBtn = document.getElementById("profile-btn");

// const viewUserProfile = (event) => {
//   event.preventDefault();
//   console.log("clicked");
// };

// profileBtn.addEventListener("click", viewUserProfile);
