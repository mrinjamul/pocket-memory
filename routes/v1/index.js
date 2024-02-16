var express = require("express");
var router = express.Router();

var userRouter = require("./user");
const pictureRouter = require("./picture");
const avatarRouter = require("./avatar");

/* API version 1 Routes */

// User profile routes
router.use("/user", userRouter);
router.use("/picture", pictureRouter);
router.use("/avatar", avatarRouter);

module.exports = router;
