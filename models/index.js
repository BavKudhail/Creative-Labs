const User = require("./User");
const Project = require("./Projects");
const Team = require("./Team");
const UserProject = require("./UserProject");
const UserTeam = require("./UserTeam");

// user/project = many to many?
// one user can work on many projects/each project has many users
User.belongsToMany(Project, {
  through: {
    model: UserProject,
    unique: false,
    foreignKey: "user_id",
    onDelete: "CASCADE",
  },
  as: "user_projects",
});

Project.belongsToMany(User, {
  through: {
    model: UserProject,
    unique: false,
    foreignKey: "project_id",
  },
  as: "project_users",
});

// user/team = many to many
// each user can belong to many teams, and each team has many users
User.belongsToMany(Team, {
  through: {
    model: UserTeam,
    unique: false,
    foreignKey: "user_id",
    onDelete: "CASCADE",
  },
  as: "user_teams",
});

Team.belongsToMany(User, {
  through: {
    model: UserTeam,
    unique: false,
    foreignKey: "team_id",
    onDelete: "CASCADE",
  },
  as: "team_users",
});

// project/team = one to one
Project.hasOne(Team, {
  foreignKey: "project_id",
});

Team.belongsTo(Project, {
  foreignKey: "project_id",
});

module.exports = { User, Project, Team, UserProject, UserTeam };
