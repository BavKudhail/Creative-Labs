const router = require("express").Router();
const { compareSync } = require("bcrypt");
const { Team, User, Project, UserTeam } = require("../../models");

// api/team

// GET ALL TEAMS
router.get("/", async (req, res) => {
  try {
    //   find all teams
    const teamData = await Team.findAll({
      // include the user associated with the team and project info
      include: [User, Project],
    });
    // serialize the data
    const teams = teamData.map((team) => team.get({ plain: true }));
    // display comments
    res.json(teams);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD USERS TO A TEAM

// Get the ID of the team that you want to join
router.post("/", async (req, res) => {
  try {
    // finding the team that matches the project id
    const findTeam = await Team.findOne({
      where: {
        project_id: req.body.project_id,
      },
    });
    // /finding the current user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    // add that user to that team
    findTeam.addUser(userData);
    // then create a new team for that project
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add the user to that team

// Because a user can belong to many teams

router.get("/userteam", async (req, res) => {
  try {
    const userteamdata = await UserTeam.findAll();
    const userteam = userteamdata.map((userteam) =>
      userteam.get({ plain: true })
    );
    res.json(userteam);
  } catch (error) {}
});

// Find all users that belong to a specific team
router.get("/team-members", async (req, res) => {
  try {
    // get all users
    const userData = await User.findAll();
    const user = userData.map((user) => {
      user.get({ plain: true });
    });
    //   find all teams
    const teamData = await Team.findAll({
      where: {
        id: 5,
      },
      // include the user associated with the team and project info
      include: [User, Project],
    });
    // serialize the data
    const teams = teamData.map((team) => team.get({ plain: true }));
    // display comments
    console.log("=========================================================");
    res.json(teams.findAll(user));
  } catch (error) {}
});

module.exports = router;
