const constants = require("../constants");

const pictureRepository = require("../repository/pictureRepository");

const fs = require("fs");
const path = require("path");

const pictureController = {
  uploadPicture: async (req, res, next) => {
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

      const filename = req.file.filename; // Get the filename
      // Move the uploaded file to the user's private directory
      const userId = req.user.id;
      const userDir = path.join("uploads", userId);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }
      fs.renameSync(req.file.path, path.join(userDir, filename));

      // Parse picture meta informations
      const url = path.join(userDir, filename);

      // create picture
      const newPicture = {
        userId: userId,
        title: filename,
        description: null,
        url: url,
        dateTaken: null,
        location: null,
        tags: [],
        privacy: "private",
        likes: 0,
        comments: [],
      };
      const picture = await pictureRepository.addPicture(newPicture);

      res.status(constants.http.StatusOK).json({
        status: true,
        message: `${filename} uploaded successfully`,
        data: picture,
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
};

module.exports = pictureController;
