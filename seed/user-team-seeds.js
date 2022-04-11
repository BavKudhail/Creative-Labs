const { UserTeam } = require("../models");

const UserTeamData = [
  {
    project_id: 1,
    user_id: 1,
  },
  {
    product_id: 2,
    user_id: 2,
  },
  {
    product_id: 3,
    user_id: 3,
  },
];

const seedUserTeams = () => UserTeam.bulkCreate(UserTeamData);

module.exports = seedUserTeams;
