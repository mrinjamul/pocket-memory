var express = require("express");
var router = express.Router();

var userRouter = require("./user");
const pictureRouter = require("./picture");

/* API version 1 Routes */

// User profile routes
router.use("/user", userRouter);
router.use("/picture", pictureRouter);

module.exports = router;
