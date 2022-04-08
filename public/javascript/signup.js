//frontend js to sign up a new user
const signupFormHandler = async (event) => {
  event.preventDefault();

  //need to add/change handlebars IDs accordingly
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const role = document.querySelector("#role").value;
  const picture_url = document.querySelector("picture_url").value.trim();

  if (username && password && role) {
    const response = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({ username, password, role, picture_url }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("click", signupFormHandler);
