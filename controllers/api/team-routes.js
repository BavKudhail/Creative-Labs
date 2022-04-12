const router = require("express").Router();
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
    // Then, Create a team for that project
    const findTeam = await Team.findOne({
      where: {
        project_id: req.body.project_id,
      },
    });
    // Then add the current user to that team
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
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

module.exports = router;
