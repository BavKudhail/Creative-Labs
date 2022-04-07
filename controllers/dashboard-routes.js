const router = require("express").Router();
const { Project, User, Team } = require("../models");
const withAuth = require("../utils/auth");

// /dashboard

// Get all Projects from currently logged in User
router.get("/", withAuth, async (req, res) => {
  try {
    // find all projects from the currently logged in user
    const projectData = await Project.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // serialize the data
    const projects = projectData.map((project) => {
      project.get({ plain: true });
    });
    // render the view to the front end
    res.send("welcome to the user dashboard");
  } catch (error) {
    // if error redirect user to login page
    res.redirect("login");
  }
});

// create a new project
// TODO - THIS IS AN ADDITIONAL FEATURE

module.exports = router;
