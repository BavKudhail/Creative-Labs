const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserTeam extends Model {}

UserTeam.init(
  {
    // id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
