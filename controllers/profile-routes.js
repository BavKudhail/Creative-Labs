const router = require("express").Router();
const { Project, Team, User } = require("../models");
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
    // const userProfile = await User.findByPk({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    res.render("view-user-profile");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
