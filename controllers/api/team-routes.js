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
    // Get current user

    // find the current logged in user
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    // serialize the data
    const user = userData.get({ plain: true });
    console.log(user);
    // Create a team
    const newTeam = await Team.create({
      ...req.body,
      // set the user Id and team name
      team_name: "Team ",
      user_id: user.Id,
      // project_id,
    });
    // Add a user to that newly created team
    const team = newTeam.get({ plain: true });

    newTeam.addUser(userData);

    res.json(newTeam);
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
