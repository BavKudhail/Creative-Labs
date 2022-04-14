const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Project extends Model {}

Project.init(
  {
    // id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // description
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // data_created
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // the users that belong to that project
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // all of the roles required
    developers_needed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    designers_needed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    artist_needed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // project picture (this is optional)
    project_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_full: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);

module.exports = Project;
