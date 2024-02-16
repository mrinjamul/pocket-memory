var express = require("express");
var router = express.Router();

const authenticated = require("../../middlewares/authenticated");
const avatarController = require("../../controllers/avatarController");
const upload = require("../../helpers/multer");

// Upload a avatar
router.post(
  "/upload",
  authenticated,
  upload.single("file"),
  avatarController.uploadAvatar
);
// Get a picture
router.get("/:file", avatarController.getAvatar);

module.exports = router;
