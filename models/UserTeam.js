const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class UserTeam extends Model {}

UserTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "teams",
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
