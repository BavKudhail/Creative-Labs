const router = require("express").Router();
const { Project, User, Team } = require("../models");
const withAuth = require("../utils/auth.js");

// /profile

// GET CURRENT LOGGED IN USER PROFILE
router.get("/", withAuth, async (req, res) => {
  try {
    // find the current logged in user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [
        Project,
        {
          model: Team,
          include: [User],
        },
      ],
    });

    // serialize the data
    const user = userData.get({ plain: true });
    console.log(JSON.stringify(user));

    // render the data to the front-end
    // res.json(user);
    res.render("my-user-profile", { user, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET USER PROFILE BY ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    // find the current logged in user
    const currentUserData = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [
        Project,
        {
          model: Team,
          include: [User],
        },
      ],
    });
    // serialize the data
    const currentUser = currentUserData.get({ plain: true });

    // find a user by ID
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        Project,
        {
          model: Team,
          include: [User],
        },
      ],
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

// CHAT WITH A SPECIFIC USER BASED ON THEIR ID
router.get("/chat/:id", withAuth, async (req, res) => {
  // find the user by their ID
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
