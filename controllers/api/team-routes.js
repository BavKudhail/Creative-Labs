const router = require("express").Router();
const res = require("express/lib/response");
const { Team, User, Project, UserTeam } = require("../../models");

// api/team

// Get all teams (This request is for debugging purposes)
router.get("/", async (req, res) => {
  try {
    // get all the teams
    const teamData = await Team.findAll({});
    // serialize the data
    const teams = teamData.map((team) => team.get({ plain: true }));
    // render the data
    res.json(teams);
    // catch errors
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a team - POST request
router.post("/", async (req, res) => {
  try {
    const newTeam = await Team.create({
      // place values of the request body in that team
      // team name
      team_name: req.body.team_name,
      // set team user_id
      user_id: req.session.user_id,
      // set team project_id
      project_id: req.session.project_id,
      // project_id: req.session.project_id,
    });
    // send this information to client side
    res.json(newTeam);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find all teams that the User is associated with

module.exports = router;
