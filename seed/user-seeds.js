const { User } = require("../models");

const userData = [
  // example user data
  {
    username: "Bav",
    password: "password",
    role: "Designer",
  },
  {
    username: "Nadine",
    password: "password",
    role: "Developer",
  },
  {
    username: "Emily",
    password: "password",
    role: "3D Artist",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
