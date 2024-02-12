var express = require("express");
var router = express.Router();

var userRouter = require("./user");

/* API version 1 Routes */

// User profile routes
router.use("/user", userRouter);

module.exports = router;
