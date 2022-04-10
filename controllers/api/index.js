const express = require("express");
const router = express.Router();

// route variables
const userRoutes = require("./user-routes");
const projectRoutes = require("./project-routes");

// use routes
router.use("/user", userRoutes);
router.use("/project", projectRoutes);

// export router
module.exports = router;
