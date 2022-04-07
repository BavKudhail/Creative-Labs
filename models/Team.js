const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Teams extends Model {}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        mode: "project",
        key: "id",
      },
    },
    team_picture: {
      type: DataTypes.STRING,
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

module.exports = Teams;
