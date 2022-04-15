// @NOTE - IN ORDER FOR IMAGE TO DISPLAY, MUST WAIT FEW SECS AND REFRESH PAGE

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

  // send a post request to update the profile picture
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

// ================ UPDATE PROJECT IMAGE ========================

// Dom variables
const updateProjectImageBtn = $(".update-project-image-btn");
const updateProjectImageForm = $(".image-update-form");

const updateProjectImage = async (event) => {
  event.preventDefault();

  const image = $(".project-image");
  // we need the specific image not the entire array
  const projectId = event.target.projectId.value;

  // the below is the input value
  const projectImage = event.target.image;

  console.log("clicked update project image");

  // this will hold the file once it has been chosen
  const formData = new FormData();

  // defining a name attribute - do we need tis?
  formData.append("image", projectImage.files[0]);

  console.log(projectImage.files);

  // send a post request to update the profile picture
  if (formData) {
    const response = await fetch(`/api/project/upload/${projectId}`, {
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

updateProjectImageForm.on("submit", updateProjectImage);

// get project id
