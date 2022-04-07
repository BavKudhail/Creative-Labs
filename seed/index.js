// import seed files
const seedUsers = require("./user-seeds");
const seedTeams = require("./team-seeds");
const seedProjects = require("./project-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
    // seed user, team and project data
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedTeams();
  await seedProjects();
  process.exit(0);
};

seedAll();
