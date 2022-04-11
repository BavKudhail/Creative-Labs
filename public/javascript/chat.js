// get project ID
const project_id = document.getElementById("project-id").innerText;

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

console.log(project_id);

console.log(joinBtn);
