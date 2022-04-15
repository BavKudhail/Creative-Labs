const router = require("express").Router();
const { User, Project, Team } = require("../../models");

// api/user/

// GET ALL USERS - this request is for insomnia purposes
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

// GET ALL USERS AND INCLUDE TEAM - NOTE - this request is for insomnia purposes
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

// SIGN UP
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

// LOGIN
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

// LOGOUT
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

// UPLOAD

// ========== IMAGE UPLOAD LOGIC TEST ==========================

// aws
const aws = require("aws-sdk");
// multer
const multer = require("multer");
// multer-s3
const multerS3 = require("multer-s3");
// uuid for generating unique file names
const uuid = require("uuid").v4;
// path module for manipulating file paths
const path = require("path");
// get a reference to our database
require("dotenv").config();

// get AWS credentials
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_BUCKET_REGION,
});

// upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

// upload a new image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // store the file data onto
    res.send({
      message: "Uploaded",
      urls: req.file,
    });

    // console.log(req.file data)
    console.log(req.file);

    // set image url variable
    const imageUrl = req.file.location;

    // THE IMAGE HAS NOW BEEN STORED ONTO S3 - NEXT UPDATE THE USERS IMAGE

    //   find user where username = req.session.username
    const updateProfileImage = User.update(
      {
        picture_url: imageUrl,
      },
      {
        where: {
          username: req.session.username,
        },
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }

  // now, set the users profile pic url as the image location
});

module.exports = router;

module.exports = router;
