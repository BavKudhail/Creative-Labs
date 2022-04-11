//PLAN
//Get PUT request working (currently bad request)
//once it's updating numbers of designers required then do a res.redirect to chat page rather than a href in handlebars
//work out how to access current user in project-item.handlebars (currently hard coded)

// When you click on join the project

const joinBtn = document.getElementById("join-team-btn");

// project form handler
const joinTheProject = async (event) => {
  event.preventDefault();
  console.log("clicked");
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
  // if I am a designer and I join the team, minus designer from the numbers
  // only do so if current number of designers is more than 0
  if (myRole === "Designer") {
    /* information regarding creatives required is taken from input fields as a string -- needs to be changed to integer in 
    order to subtract and also for it to be changed in the database */
    let designerInteger = parseInt(designers_needed);
    if (designerInteger === 0) {
      console.log("We already have enough designers!");
      return;
    } else {
      //reassign value to designers_needed in order to match up with info in PUT request/database
      designers_needed = designerInteger - 1;

      const response = await fetch("/api/project/:id", {
        method: "PUT",
        body: JSON.stringify(designers_needed),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.reload();
        //document.location.replace("/chat")
      }
    }
  }
  // if I am a developer and I join the team, minus developer from the numbers
  if (myRole === "Developer") {
    let developerInteger = parseInt(developers_needed);
    if (developerInteger === 0) {
      console.log("We already have enough developers!");
      return;
    } else {
      developers_needed = developerInteger - 1;
      const response = await fetch("/api/project/:id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // integer so not sure if needs stringifying?
        body: JSON.stringify(developers_needed),
      });
      if (response.ok) {
        window.location.reload();
      }
    }
  }
  // if I am an artist and I join the team, minus the artist from the numbers
  if (myRole === "3D Artist") {
    let artistInteger = parseInt(artist_needed);
    if (artistInteger === 0) {
      console.log("We already have enough artists!");
      return;
    } else {
      artist_needed = artistInteger - 1;
      const response = await fetch("/api/project/:id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artist_needed),
      });
      if (response.ok) {
        window.location.reload();
      }
    }
  }
};

joinBtn.addEventListener("click", joinTheProject);

// When a user clicks join the chat
// Get the values of that project that was clicked on -
// Send a POST request to create a new project with the title and description values of
// the current object clicks
