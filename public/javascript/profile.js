const updateImageBtn = document.getElementById("image-submit-btn");
const updateImageForm = document.getElementById("image-update-form");
const image = document.getElementById("image-value");

const updateProfileImage = async (event) => {
  // prevent page from refreshing
  event.preventDefault();
  // this will hold the file once it has been chosen
  const formData = new FormData();

  // defining a name attribute - do we need tis?
  formData.append("image", image.files[0]);
  console.log(image.files);

  console.log("clicked submit button");

  if (formData) {
    const response = await fetch("/api/user/upload", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

updateImageForm.addEventListener("submit", updateProfileImage);

// is there anyway to refresh when it comes together