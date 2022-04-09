const router = require("express").Router();
const { Project, User } = require("../../models");

// api/project

// Get all projects (This is for debugging purposes)
router.get("/", async (req, res) => {
  try {
    // ==== @TODO - An error occurs when I { include: [User] } =====

    // get all projects
    const projectData = await Project.findAll({
      include: [User],
    });
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
router.put("/:id", async (req, res) => {
  try {
    const updateProject = await Project.update(
      {
        designers_needed: req.body.designers_needed,
        developers_needed: req.body.developers_needed,
        artist_needed: req.body.artist_needed,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
