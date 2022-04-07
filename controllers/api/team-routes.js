const router = require("express").Router();
const { Team } = require("../../models");

// api/team

// Get all teams (This request is for debugging purposes)
router.get("/", async (req, res) => {
  try {
    // get all users
    const teamData = await Team.findAll();
    // serialize the data
    const teams = teamData.map((team) => team.get({ plain: true }));
    // render the data
    res.json(teams);
    // catch errors
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new team
// This is for future development

module.exports = router;
