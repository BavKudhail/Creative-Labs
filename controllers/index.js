const express = require("express");
const router = express.Router();

// route variables
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const profileRoutes = require("./profile-routes");

// use routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);

// export router
module.exports = router;
