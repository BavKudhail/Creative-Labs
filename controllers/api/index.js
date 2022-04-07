const express = require("express");
const router = express.Router();

// route variables
const userRoutes = require("./user-routes");

// use routes
router.use("/user", userRoutes);

// export router
module.exports = router;
