var express = require("express");
var router = express.Router();

const viewRouter = require("./views");
const authRouter = require("./auth");
const apiRouter = require("./api");

/* All routes */
// Authentication route
router.use("/auth", authRouter);

router.use("/api", apiRouter);

// Frontend Route
router.use("/", viewRouter);

module.exports = router;
