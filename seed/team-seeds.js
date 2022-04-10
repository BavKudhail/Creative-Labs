const { Team } = require("../models");

const teamData = [
  {
    team_name: "Blockchain Beasts",
  },
  {
    team_name: "NFT Ninjas",
  },
  {
    team_name: "Database Duo",
  },
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;
