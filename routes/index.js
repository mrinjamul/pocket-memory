var express = require("express");
var router = express.Router();

const viewRouter = require("./views");
const authRouter = require("./auth");

/* All routes */
router.use("/", viewRouter);
router.use("/auth", authRouter);

module.exports = router;
