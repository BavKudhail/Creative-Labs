const { Model, DataTypes } = require("sequelize");
// bcrypt for ecrypting passwords
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
    //   user id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    // user role
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // picture URL
    picture_url: {
      type: DataTypes.STRING,
      allowNull: true,
      // the default value is null
      defaultValue: null,
    },
  },
  {
    // hooks
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
