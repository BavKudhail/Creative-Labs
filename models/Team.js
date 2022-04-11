const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Team extends Model {}

Team.init(
  {
    // id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING,
    },
    // user ID
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // project ID
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "project",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "team",
  }
);

module.exports = Team;
