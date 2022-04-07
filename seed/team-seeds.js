const { Team } = require("../models");

const teamData = [
    // example team data
  {
    team_name: "Blockchain Beasts",
    team_picture: "",
  },
  {
    team_name: "NFT Ninjas",
    team_picture: "",
  },
  {
    team_name: "Database Duo",
    team_picture: "",
  },
  {
    team_name: "Backend Badboys",
    team_picture: "",
  },
  {
    team_name: "Apple Architects",
    team_picture: "",
  },
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;
