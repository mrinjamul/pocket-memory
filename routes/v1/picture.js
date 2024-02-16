var express = require("express");
var router = express.Router();

const authenticated = require("../../middlewares/authenticated");
const pictureController = require("../../controllers/pictureController");
const upload = require("../../helpers/multer");

// Upload a picture
router.post(
  "/upload",
  authenticated,
  upload.single("file"),
  pictureController.uploadPicture
);
// Get all file lists
router.get("/", pictureController.getAllPicture);
// Get a picture
router.get("/:file", pictureController.getAPicture);

module.exports = router;
