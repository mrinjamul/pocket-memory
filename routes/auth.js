var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");

// POST signup: to register a user.
router.post("/signup", authController.signup);

// POST login: login a user.
router.post("/login", authController.login);

// GET logout: logout the user.
router.get("/logout", authController.logout);

module.exports = router;
