const router = require("express").Router();
const { Project, User, Team, UserTeam } = require("../../models");

// api/project

// Get all projects
router.get("/", async (req, res) => {
  try {
    // get all projects
    const projectData = await Project.findAll({
      // project belongs to a specific user that created it
      include: [
        {
          model: User,
          attributes: ["username", "role"],
        },
        {
          model: Team,
        },
      ],
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
      title: req.body.title,
      description: req.body.description,
      developers_needed: req.body.developers_needed,
      designers_needed: req.body.designers_needed,
      artist_needed: req.body.artist_needed,
      // set the user id to the currently logged in use
      user_id: req.session.user_id,
    });
    // Then, Create a team for that project
    const newTeam = await Team.create({
      ...req.body,
      // set the user Id and team name
      team_name: "Team " + newProject.title,
      user_id: req.session.user_id,
      project_id: newProject.id,
    });
    // Then add the current user to that team
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    newTeam.addUser(userData);

    res.json(newProject);
    // then create a new team for that project
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find the current team based on the project id
// Loop through the array of users within the team.users array
// If current_username = user.username
// The user already belongs to tha team
// Do not run the put route

// const isUserInTeam = async () => {
//   try {
//     // finding the team based on project-id
//     const findTeam = await Team.findOne({
//       where: {
//         project_id: req.body.project_id,
//       },
//     });
//     // /finding the current user based on user-id
//     const userData = await User.findOne({
//       where: {
//         username: req.session.username,
//       },
//     });
//     // serialize data
//     const team = findTeam.get({ plain: true });
//     const user = userData.get({ plain: true });
//     // find team users
//     const teamMembers = team.users;
//     // loop through the team members return true if username is in team or false if not
//     for(let i = 0; i < teamMembers.length; i++){

//     }
//     console.log(team);
//   } catch (error) {}
// };

// isUserInTeam();

// Update a project
router.put("/:id", async (req, res) => {
  try {
    const updateProject = await Project.update(
      {
        //specify parameters that can be updated
        designers_needed: req.body.designers_needed,
        developers_needed: req.body.developers_needed,
        artist_needed: req.body.artist_needed,
      },
      {
        //update project according to ID
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json(updateProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a project  - @NOTE - THIS IS NOT CURRENTLY BEING USED
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
