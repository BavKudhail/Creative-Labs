// Requiring all of our Models
const User = require("./User");
const Project = require("./Projects");
// const Team = require("./Team");
// const UserTeam = require("./UserTeam");

// Establishing our Associations

// A user can have many projects
User.hasMany(Project, {
  foreignKey: "user_id",
  // When you delete User, delete all projects associated with that User
  onDelete: "CASCADE",
});

// A project always belong to a specific user that created it
Project.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// A project has one team

// Project.hasOne(Team, {
//   foreignKey: "project_id",
//   onDelete: "CASCADE",
// });

// A team belongs to that project

// Team.belongsTo(Project, {
//   foreignKey: "project_id",
//   onDelete: "CASCADE",
// });

// Below are many-to-many relationships

// A team can have many users
// Team.belongsToMany(User, {
//   through: {
//     // this creates the junction table
//     model: UserTeam,
//     unique: false,
//     foreignKey: "team_id",
//     onDelete: "CASCADE",
//   },
//   as: "team_users",
// });

// A user can have many teams
// User.belongsToMany(Team, {
//   through: {
//     model: UserTeam,
//     unique: false,
//     foreignKey: "user_id",
//     onDelete: "CASCADE",
//   },
//   as: "user_teams",
// });

// junction table "FOLLOW"

module.exports = { User, Project };
