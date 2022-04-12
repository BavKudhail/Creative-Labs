// Requiring all of our Models
const User = require("./User");
const Project = require("./Projects");
const Team = require("./Team");
const UserTeam = require("./UserTeam");

// A user can have many projects
User.hasMany(Project, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A project always belong to a specific user that created it
Project.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});




// Team X Project
Team.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});

Team.belongsToMany(User, {
  through: UserTeam,
  unique: false,
});

User.belongsToMany(Team, {
  through: UserTeam,
  unique: false,
});

// Each team has many users?

module.exports = { User, Project, Team, UserTeam };
