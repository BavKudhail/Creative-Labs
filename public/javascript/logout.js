const logout = async () => {
  // fetch request
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  //   If response is successful return to homepage
  if (response.ok) {
    document.location.replace("/");
    alert("Logged out");
  } else {
    alert("Failed to log out");
  }
};
// when user clicks logout button execute logout function
document.querySelector("#logout-btn").addEventListener("click", logout);
document.querySelector("#logout-btn-nav").addEventListener("click", logout);
