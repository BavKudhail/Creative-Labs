const router = require("express").Router();
const { Project, Team, User } = require("../models");
const withAuth = require("../utils/auth.js");

// home routes ( / )

// Get All Projects
router.get("/", async (req, res) => {
  try {
    // ==== @TODO - An error occurs when I { include: [User] } =====

    // get all projects
    const projectData = await Project.findAll();
    // serialize the data
    const projects = projectData.map((project) => project.get({ plain: true }));
    // render data to front-end
    res.json(projects);
    // catch errors
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Project
router.get("/project/:id", async (req, res) => {
  try {
    // get a single project
    const projectData = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });
    // serialize the data
    const project = projectData.get({ plain: true });
    // render data to front end
    res.json(project);
    // catch errors
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login route
router.get("/login", (req, res) => {
  // if user is logged in, redirect to dashboard
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.send("please login");
  }
});

// Signup Route
router.get("/signup", (req, res) => {
  // if user is logged in
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.send("please signup");
  }
});

module.exports = router;
