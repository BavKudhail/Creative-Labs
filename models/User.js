const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Create class User that extends from Model
class User extends Model {
  // Check user password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  // Define model attributes
  {
    //   user ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // user username
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // user password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      // before
      beforeCreate: async (newUserData) => {
        // set password to a crypted version of that password
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // this is the student that will actually be created
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    // Further model options
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
