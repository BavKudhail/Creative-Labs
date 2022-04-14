// $(document).ready(function () {
//   $(".sidenav").sidenav();
// });

// $(document).ready(function () {
//   $("select").formSelect();
// });

//DONT NEED ANY OF THE LOGIC ON THIS PAGE

// this works on chat but not properly here
// When this is linked to project-item.handlebars it stops the projects from rendering so only one project displayed-won't loop

// const checkTeam = () => {
//   // no of designers needed
//   let designers_needed = document.getElementById("designers_needed").innerText;
//   // no of developers needed
//   let developers_needed =
//     document.getElementById("developers_needed").innerText;
//   // no of artist needed
//   let artist_needed = document.getElementById("artist_needed").innerText;

//   const joinButton = document.getElementById("join-team-btn");

//   const href = document.getElementById("disable-this");

//   const project = document.getElementById("project-card");

//   console.log("restriction function connected");
//   //need to put a for loop or something here to loop through projects
//   // but projects not in an array, they're looped over in handlebars?!
//   // there is a projects array in project-routes
//   // fetch request in order to loop? -> doesn't work
//   //get all projects, save to variable, then loop over

//   if (designers_needed <= 0 && developers_needed <= 0 && artist_needed <= 0) {
//     joinButton.setAttribute("disabled", true);
//     //joinButton.innerText("This team is full!");
//     //href.setAttribute("style", "pointer-events: none");
//   }
// };

// checkTeam();

// //joinButton.addEventListener("click", checkTeam);
// // //
// // const profileBtn = document.getElementById("profile-btn");

// // const viewUserProfile = (event) => {
// //   event.preventDefault();
// //   console.log("clicked");
// // };

// // profileBtn.addEventListener("click", viewUserProfile);
