const router = require("express").Router();
const { Project } = require("../../models");

// api/projects

// Get all projects (This is for debugging purposes)
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

// Create a project
router.post("/", async (req, res) => {
  try {
    console.log("post request sent");
    // create a new project
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a project
// This is for future development

// Delete a project
// This is for future development

module.exports = router;
