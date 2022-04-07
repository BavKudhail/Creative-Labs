const { User } = require("../models");

const userData = [
  // example user data
  {
    username: "Bav",
    password: "password",
    role: "3D Artist",
    picture_url: "",
  },
  {
    username: "Nadine",
    password: "password",
    role: "Developer",
    picture_url: "",
  },
  {
    username: "Emily",
    password: "password",
    role: "Developer",
    picture_url: "",
  },
  {
    username: "Dan",
    password: "password",
    role: "Designer",
    picture_url: "",
  },
  {
    username: "Sam",
    password: "password",
    role: "Designer",
    picture_url: "",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
