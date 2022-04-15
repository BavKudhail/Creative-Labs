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
    res.json(teams);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD USERS TO A TEAM
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
  } catch (error) {
    res.status(500).json(error);
  }
});

// NOTE - This function is not being used in production - it is for debugging purposes on insomnia/postman
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
