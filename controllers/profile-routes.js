const router = require("express").Router();
const { Project, Team, User } = require("../models");
const withAuth = require("../utils/auth.js");

// /profile
router.get("/", async (req, res) => {
  try {
    const userProfile = await User.findOne({
      where: {
        id: req.session.id,
      },
    });
    res.render("my-user-profile");
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
