var express = require("express");
var router = express.Router();

const userController = require("../../controllers/userController");

router.get("/:username", userController.getProfile);

module.exports = router;
