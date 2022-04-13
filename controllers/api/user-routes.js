const router = require("express").Router();
const { User, Project, Team } = require("../../models");

// api/user/

// Get all users (This request is for debugging purposes)
router.get("/", async (req, res) => {
  try {
    // get all users include project and team info associated with the user
    const userData = await User.findAll({
      include: [
        {
          model: Project,
          attributes: { exclude: "user_id" },
        },
        {
          model: Team,
          attributes: ["team_name"],
        },
      ],
    });

    // serialize the data
    const users = userData.map((user) => user.get({ plain: true }));

    // render the data
    res.json(users);

    // catch errors
  } catch (error) {
    res.status(500).send(error);
  }
});

/// Get all users with teams (This request is for debugging purposes)
router.get("/team", async (req, res) => {
  try {
    // get all users
    const userData = await User.findAll({
      include: [Team],
    });
    // serialize the data
    const users = userData.map((user) => user.get({ plain: true }));
    // render the data
    res.json(users);
    // catch errors
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sign up
router.post("/", async (req, res) => {
  try {
    //   create new user
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      linkedin: req.body.linkedin,
      email: req.body.email,
      picture_url: req.body.picture_url,
    });
    // save user session
    req.session.save(() => {
      req.session.user_id;
      req.session.username = newUser.id;
      req.session.loggedIn = true;
    });
    // send to front-end
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    //   find user where username = req.body.username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // if username does not exist
    if (!user) {
      res.status(400).json({ message: "Oops! No username found!" });
      return;
    }
    // check password
    const password = user.checkPassword(req.body.password);
    // if password does not exist
    if (!password) {
      res.status(400).json({ message: "Oops! No password found!" });
      return;
    }
    // save that user session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      //   send message
      res.json({ user, message: "You are now logged in!" });
    });
    // catch errors
  } catch (error) {
    res.status(400).json({ message: "Oops! No account found!" });
  }
});

// logout
router.post("/logout", async (req, res) => {
  // if user is logged in, delete session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.json({ message: "You are now logged out!" });
      //   res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
