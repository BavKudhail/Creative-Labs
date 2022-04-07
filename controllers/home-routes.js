const router = require("express").Router();
const { Project, Team, User } = require("../models");
const withAuth = require("../utils/auth");

// home route ( / )

// @TODO - TRY THIS BELOW

// Get all projects for the homepage
router.get("/", async (req, res) => {
  try {
    // get all projects and include the user for each project
    const projectData = await Project.findAll({
      include: [User],
    });
    // serialize the data
    const projects = projectData.map((project) => project.get({ plain: true }));
    // render projects to homepage
    res.render("homepage", { projects, loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
