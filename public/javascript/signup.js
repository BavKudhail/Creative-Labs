// <script>
$(document).ready(function () {
  $(".sidenav").sidenav();
});
$(document).ready(function () {
  $(".slider").slider({ height: 350, indicators: false });
});
$(document).ready(function () {
  $("select").formSelect();
});
function handleImageUpload() {
  var image = document.getElementById("upload").files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("display-image").src = e.target.result;
  };
  reader.readAsDataURL(image);
}
// </script>

//frontend js to sign up a new user
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the sign up form
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  // Getting value of the role
  const select = document.getElementById("role");
  const role = select.options[select.selectedIndex].value;
  // Getting the value of the picture URL

  console.log(username);
  console.log(password);
  console.log(role);
  // console.log(picture_url);

  // If values are present
  if (username && password && role) {
    console.log("send request to API endpoint");
    // Send a request to the API endpoint
    const response = await fetch("/api/user/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        role,
        // picture_url,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // if response success redirect the user to their profile
      console.log("response is successful");
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
};

// sign up button
const signupBtn = document.getElementById("sign-up-btn");

signupBtn.addEventListener("click", signupFormHandler);
