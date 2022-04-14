console.log("profile logic connected");

const updatePictureBtn = document.getElementById("update-profile-button");

console.log(updatePictureBtn);

const updatePicture = () => {
  console.log("execute picture function");
};

updatePictureBtn.addEventListener("click", updatePicture);
