const router = require("express").Router();
const { Project, User } = require("../models");
const withAuth = require("../utils/auth.js");

// /profile
router.get("/", async (req, res) => {
  try {
    // find the current logged in user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [Project],
    });
    // serialize the data
    const user = userData.get({ plain: true });
    // render the data to the front-end
    res.render("my-user-profile", { user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    // find a user by ID
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Project],
    });
    // serialize the data
    const user = userData.get({ plain: true });

    // render the data to the front-end
    res.render("view-user-profile", { user });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

// when the user clicks on join a project
// then
// that projects appears on that users profile page 

// how will this work?
// we will have to send a POST request 
// create a post request and add it to the users profile page
// simply change the user ID of that of our user