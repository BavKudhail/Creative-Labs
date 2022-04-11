const router = require("express").Router();
const { Team, User, Project, UserTeam } = require("../../models");

// api/team

// GET ALL TEAMS
router.get("/", async (req, res) => {
  try {
    //   find all teams
    const teamData = await Team.findAll({
      // include the user associated with the comment
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

module.exports = router;
