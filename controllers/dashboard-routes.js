const router = require("express").Router();
const { Project, User, Team } = require("../models");
const withAuth = require("../utils/auth");

// /dashboard

// Get All Projects
router.get("/", async (req, res) => {
  try {
    // get all projects
    const projectData = await Project.findAll({
      include: {
        model: User,
      },
    });
    // serialize the data
    const projects = projectData.map((project) => project.get({ plain: true }));
    // render data to front-end
    // res.json(projects);
    console.log(projects);
    res.render("dashboard", { projects, loggedIn: req.session.loggedIn });
    // catch errors
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Single Project
router.get("/:id", async (req, res) => {
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
    res.render("view-single-project");
    // catch errors
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
