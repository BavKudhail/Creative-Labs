const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserTeam extends Model {}

// user team junction table
UserTeam.init(
  {
    // id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // user_id
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
    // team_id
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "team",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_team",
  }
);

module.exports = UserTeam;
