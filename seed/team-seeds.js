const { Team } = require("../models");

const teamData = [
  // example project data
  {
    team_name: "team_one",
  },
  {
    team_name: "team_two",
  },
  {
    team_name: "team_three",
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
