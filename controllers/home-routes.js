const router = require("express").Router();
const { Project, User } = require("../models");
const withAuth = require("../utils/auth.js");

// home routes ( / )
router.get("/", (req, res) => {
  res.render("homepage");
});

// LOGIN
router.get("/login", (req, res) => {
  // if user is logged in, redirect to dashboard
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("login");
  }
});

// SIGN UP
router.get("/signup", (req, res) => {
  // if user is logged in
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("signup");
  }
});

// CREATE A NEW PROJECT
router.get("/create-project", async (req, res) => {
  try {
    res.render("create-project", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
