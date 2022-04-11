// import seed files
const seedUsers = require("./user-seeds");
const seedTeam = require("./team-seeds");
const seedProjects = require("./project-seeds");
const seedUserTeams = require("./user-team-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  // seed user, team and project data
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedTeam();
  await seedProjects();
  await seedUserTeams();
  process.exit(0);
};

seedAll();
