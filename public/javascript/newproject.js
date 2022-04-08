// DOM variables
const projectForm = document.querySelector("#project-form");
const submitBtn = document.querySelector(".submit-btn");

// comment form handler
const projectFormHandler = async (event) => {
  event.preventDefault();

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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // redirect user to dashboard
      document.location.replace("/dashboard");
    } else {
      // else alert
      alert(response.statusText);
    }
  }
};

projectForm.addEventListener("submit", projectFormHandler);
