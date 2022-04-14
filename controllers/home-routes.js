const router = require("express").Router();
const { Project, User } = require("../models");
const withAuth = require("../utils/auth.js");

// home routes ( / )
router.get("/", (req, res) => {
  res.render("homepage");
});

// ======== TEST IMAGE UPLOAD LOGIC =============

// Update profile picture
router.get("/upload", (req, res) => {
  res.render("image-upload");
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

// Create a new Project
router.get("/create-project", async (req, res) => {
  try {
    res.render("create-project", { loggedIn: req.session.loggedIn });
  } catch (error) {
    // how to code this?
  }
});

router.get("/upload", async (req, res) => {
  res.render("image-upload");
});

module.exports = router;
