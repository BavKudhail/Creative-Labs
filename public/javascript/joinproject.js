// // When you click on join the project

// When the user clicks join this team

// Check to see if the current user is a member of this team

// If the user is a member this team, then send, you are already a member

// Else run the function

const joinBtn = document.getElementById("join-btn");

console.log("join project connected");

// project form handler
const joinTheProject = async (event) => {
  event.preventDefault();
  console.log("clicked");

  //  get the current values of all of the roles

  const id = document.getElementById("project-id").innerText;

  // no of designers needed
  let designers_needed = document.getElementById("designers_needed").innerText;
  // no of developers needed
  let developers_needed =
    document.getElementById("developers_needed").innerText;
  // no of artist needed
  let artist_needed = document.getElementById("artist_needed").innerText;
  // get the current role of the user
  const myRole = document.getElementById("my-role").innerText;

  //need this first if statement on dashboard page
  if (
    designers_needed === 0 &&
    developers_needed === 0 &&
    artist_needed === 0
  ) {
    window.alert("This team is full!");
    return;
  } else {
    // if I am a designer and I join the team, minus designer from the numbers
    if (myRole === "Designer") {
      //let designerInteger = parseInt(designers_needed);
      if (designers_needed <= 0) {
        window.alert("We already have enough designers!");
        return;
      } else {
        try {
          //reassign value to designers_needed in order to match up with info in PUT request/database
          designers_needed = designers_needed - 1;
          console.log(designers_needed);

          const response = await fetch("/api/project/:id", {
            method: "PUT",
            body: JSON.stringify({
              id,
              designers_needed,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          // if (response.ok) {
          //   // document.location.reload();
          // }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // if I am a developer and I join the team, minus developer from the numbers
    if (myRole === "Developer") {
      //let designerInteger = parseInt(designers_needed);
      if (developers_needed <= 0) {
        window.alert("We already have enough developers!");
        return;
      } else {
        try {
          //reassign value to designers_needed in order to match up with info in PUT request/database
          developers_needed = developers_needed - 1;
          console.log(developers_needed);

          const response = await fetch("/api/project/:id", {
            method: "PUT",
            body: JSON.stringify({
              id,
              developers_needed,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          // if (response.ok) {
          //   // document.location.reload();
          // }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // }
    // if I am an artist and I join the team, minus the artist from the numbers
    if (myRole === "3D Artist") {
      //let designerInteger = parseInt(designers_needed);
      if (artist_needed <= 0) {
        window.alert("We already have enough artists!");
        return;
      } else {
        try {
          //reassign value to designers_needed in order to match up with info in PUT request/database
          artist_needed = artist_needed - 1;
          console.log(artist_needed);

          const response = await fetch("/api/project/:id", {
            method: "PUT",
            body: JSON.stringify({
              id,
              artist_needed,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          // if (response.ok) {
          //   // document.location.reload();
          // }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  if (myRole) {
    // Get the project_id from the DOM
    const project_id = parseInt(
      document.getElementById("project-id").innerText
    );
    // Then, I am added to that team
    const response = await fetch("/api/team", {
      method: "POST",
      body: JSON.stringify({
        project_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("reload the page");
    // document.location.reload();
    if (response.ok) {
      console.log("response ok!");
      document.location.reload();
    } else {
      // else alert
      alert(response.statusText);
    }
  }
};

joinBtn.addEventListener("click", joinTheProject);
