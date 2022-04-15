const router = require("express").Router();
const { Project, User, Team, UserTeam } = require("../../models");

// api/project

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    // get all projects
    const projectData = await Project.findAll({
      // project belongs to a specific user that created it
      include: [
        {
          model: User,
          attributes: ["username", "role"],
        },
        {
          model: Team,
        },
      ],
    });

    // serialize the data
    const projects = projectData.map((project) => project.get({ plain: true }));

    // render data to front-end
    res.json(projects);

    // catch errors
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE PROJECT - @NOTE - is there a way to execute the below code more effeciently?
router.post("/", async (req, res) => {
  try {
    console.log("post request sent");

    // create a new project
    const newProject = await Project.create({
      title: req.body.title,
      description: req.body.description,
      developers_needed: req.body.developers_needed,
      designers_needed: req.body.designers_needed,
      artist_needed: req.body.artist_needed,
      // set the user id to the currently logged in use
      user_id: req.session.user_id,
    });
    // Then, Create a team for that project
    const newTeam = await Team.create({
      ...req.body,
      // set the user Id and team name
      team_name: "Team " + newProject.title,
      user_id: req.session.user_id,
      project_id: newProject.id,
    });
    // Then add the current user to that team
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    newTeam.addUser(userData);

    res.json(newProject);
    // then create a new team for that project
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PROJECT - @NOTE - this route is for debugging purposes and has not been implemented in the front-end as of yet
router.put("/:id", async (req, res) => {
  try {
    const updateProject = await Project.update(
      {
        //specify parameters that can be updated
        designers_needed: req.body.designers_needed,
        developers_needed: req.body.developers_needed,
        artist_needed: req.body.artist_needed,
      },
      {
        //update project according to ID
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json(updateProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE PROJECTS
router.delete("/:id", async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// ========== PROJECT UPLOAD LOGIC ==========================
// @NOTE - future, use UUID in order to generate unique image names to avoid duplication and replacement

// aws
const aws = require("aws-sdk");
// multer
const multer = require("multer");
// multer-s3
const multerS3 = require("multer-s3");
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

// upload image using multer
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

// UPLOAD PROJECT IMAGE BASED ON PROJECT ID
router.post("/upload/:id", upload.single("image"), (req, res) => {
  try {
    // store the file data onto
    res.send({
      message: "Uploaded",
      urls: req.file,
    });

    // set image url variable
    const imageUrl = req.file.location;

    // THE IMAGE HAS NOW BEEN STORED ONTO S3 - NEXT UPDATE THE PROJECT IMAGE

    //   find the project based on the project ID
    const updateProjectImage = Project.update(
      {
        project_picture: imageUrl,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
