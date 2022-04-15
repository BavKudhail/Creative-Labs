const router = require("express").Router();
const { Project, User, Team, UserTeam } = require("../models");
const withAuth = require("../utils/auth");

// /dashboard

// GET ALL PROJECTS
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

// GET CHAT BASED ON PROJECT ID
router.get("/chat/:id", async (req, res) => {
  try {
    // find the current logged in user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      // include: [Project],
    });
    // serialize the data
    const user = userData.get({ plain: true });

    // get a single project
    const projectData = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: [User, Team],
    });
    // seriaize the data
    const project = projectData.get({ plain: true });

    // get the team data associated with that project
    const teamData = await Team.findOne({
      where: {
        project_id: project.id,
      },
      include: [User],
    });

    // serialize the data
    const team = teamData.get({ plain: true });

    console.log("===========================================================");
    console.log(team.users[0]);

    // render the data to front-end
    res.render("chat", {
      project,
      user,
      team,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
