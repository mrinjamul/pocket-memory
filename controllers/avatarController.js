const constants = require("../constants");

const fs = require("fs");
const path = require("path");

const jwt = require("../helpers/jwt");

// import server info
const config = require("../config").getConfig();
var port = config.server.port;
var server_url = `${config.server.address}:${port}/api/v1/picture/`;

const querystring = require("querystring");
const userRepository = require("../repository/userRepository");

const avatarController = {
  uploadAvatar: async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(constants.http.StatusInternalServerError).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "No file uploaded",
          message: "",
        });
        return;
      }

      var filename = req.file.filename; // Get the filename
      const ext = path.extname(filename);
      // Move the uploaded file to the user's private directory
      const user = req.user;
      filename = user.username + ext;
      const userDir = path.join("uploads", "avatars");
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }
      fs.renameSync(req.file.path, path.join(userDir, filename));

      // Parse picture meta informations
      const userData = await userRepository.updateUserByUsername(
        user.username,
        { avatar: filename }
      );

      res.status(constants.http.StatusOK).json({
        status: true,
        message: `${filename} uploaded successfully`,
        data: userData,
      });
    } catch (err) {
      console.error(err);
      res.status(constants.http.StatusInternalServerError).json({
        status: false,
        code: constants.http.StatusInternalServerError,
        error: "Internal Server Error",
        message: err,
      });
    }
  },
  getAvatar: async (req, res, next) => {
    try {
      // Get the filename from the request params
      const filename = req.params.file;

      const avatar = path.join("uploads/avatars/", filename);

      // Construct the filepath
      const filePath = path.join(__dirname, "..", avatar);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Serve the file
        res.status(constants.http.StatusOK).sendFile(filePath);
      } else {
        // If the file does not exist, return a 404 error
        res.status(404).json({
          status: false,
          code: constants.http.StatusInternalServerError,
          error: "File not found",
          message: "File not found",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(constants.http.StatusInternalServerError).json({
        status: false,
        code: constants.http.StatusInternalServerError,
        error: "Internal Server Error",
        message: err,
      });
    }
  },
};

module.exports = avatarController;
