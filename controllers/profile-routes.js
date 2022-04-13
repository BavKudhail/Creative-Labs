const router = require("express").Router();
const { Project, User, Team } = require("../models");
const withAuth = require("../utils/auth.js");

// /profile
router.get("/", async (req, res) => {
  try {
    // find the current logged in user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [Project, Team],
    });
    // get all teams of the currently logged in user

    // serialize the data
    const user = userData.get({ plain: true });
    // render the data to the front-end
    res.render("my-user-profile", { user, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    // find the current logged in user
    const currentUserData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    // serialize the data
    const currentUser = currentUserData.get({ plain: true });

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
    res.render("view-user-profile", {
      user,
      currentUser,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Chat with user
router.get("/chat/:id", async (req, res) => {
  // fund the user by their ID
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Project],
    });
    // serialize the data
    const user = userData.get({ plain: true });
    // render the data to the front-end
    res.render("view-user-profile", { user, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
