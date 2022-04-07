const router = require("express").Router();
const { Project, Team, User } = require("../models");
const withAuth = require("../utils/auth.js");

// home routes ( / )
router.get("/", (req, res) => {
  res.render("homepage");
});

// Login route
router.get("/login", (req, res) => {
  // if user is logged in, redirect to dashboard
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("login");
  }
});

// Signup Route
router.get("/signup", (req, res) => {
  // if user is logged in
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("signup");
  }
});




// @Function 
// router.get("/", async (req, res) => {
//   try {
//     // get all users
//     const userData = await User.findAll();
//     // serialize the data
//     const users = userData.map((user) => user.get({ plain: true }));
//     // render the data
//     res.json(users);
//     // catch errors
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
