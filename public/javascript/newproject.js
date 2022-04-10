// DOM variables
const projectForm = document.querySelector("#project-form");
const submitBtn = document.querySelector(".submit-btn");

// project form handler
const projectFormHandler = async (event) => {
  event.preventDefault();

  // place roles into variables
  const developers_needed = document.getElementById("developers_needed").value;
  const designers_needed = document.getElementById("designers_needed").value;
  const artist_needed = document.getElementById("artist_needed").value;
  const team_name = document.getElementById("team_name").value;

  console.log(team_name);
  console.log(designers_needed);
  console.log(artist_needed);
  console.log(developers_needed);

  // Place new post title and content into variables
  const title = document.querySelector("#new-project-title").value;
  const description = document.querySelector("#new-project-description").value;

  // if post title & post content are true
  if (title && description) {
    console.log(title, description);
    // Send POST request to endpoint
    const response = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        developers_needed,
        designers_needed,
        artist_needed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // if the response is successful - create a team for that project

      const response = await fetch("/api/team", {
        method: "POST",
        body: JSON.stringify({
          team_name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      document.location.replace("/dashboard");
    } else {
      // else alert
      alert(response.statusText);
    }
  }
};

projectForm.addEventListener("submit", projectFormHandler);
