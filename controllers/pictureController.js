const constants = require("../constants");

const pictureRepository = require("../repository/pictureRepository");

const fs = require("fs");
const path = require("path");

const jwt = require("../helpers/jwt");

// import server info
const config = require("../config").getConfig();
var port = config.server.port;
var server_url = `${config.server.address}:${port}/api/v1/picture/`;

const querystring = require("querystring");
const userRepository = require("../repository/userRepository");

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
      let picture = await pictureRepository.addPicture(newPicture);
      picture.url = "http://" + server_url + querystring.escape(picture.title);

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
  getAllPicture: async (req, res, next) => {
    try {
      // check if authenticated user
      var isAuthenticated = false;
      var token;
      // get token from header
      try {
        token = req.headers.authorization.split(" ")[1];
      } catch (err) {
        // console.log("error: failed to get token from header");
      }

      if (!token) {
        // get cookie
        token = req.cookies.token;
      }

      var userData;
      // if token exist and verified set authenticated
      if (token) {
        // verify token
        const verifyOpts = jwt.getVerifyingOptions();
        const decodedToken = await jwt.verifyToken(token, verifyOpts);
        if (decodedToken) {
          isAuthenticated = true;
          userData = decodedToken;
        }
      }

      var images;
      if (isAuthenticated) {
        images = await pictureRepository.getPicturesByUserId(userData.id);
      } else {
        images = await pictureRepository.getAllPublicPictures();
      }

      // convert relative path to absolute url
      images.forEach((img) => {
        img.url = "http://" + server_url + querystring.escape(img.title);
      });

      res.status(constants.http.StatusOK).json({
        status: true,
        data: images,
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
  getPublicPictureByUser: async (req, res, next) => {
    try {
      const username = req.params.username;
      const userData = await userRepository.getUserByUsername(username);
      var images;
      images = await pictureRepository.getAllPublicPicturesByUser(userData._id);

      // convert relative path to absolute url
      images.forEach((img) => {
        img.url = "http://" + server_url + querystring.escape(img.title);
      });

      res.status(constants.http.StatusOK).json({
        status: true,
        data: images,
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
  getAPicture: async (req, res, next) => {
    try {
      // Get the filename from the request params
      const filename = req.params.file;
      // // check if authenticated user
      // var isAuthenticated = false;
      // var token;
      // // get token from header
      // try {
      //   token = req.headers.authorization.split(" ")[1];
      // } catch (err) {
      //   // console.log("error: failed to get token from header");
      // }

      // if (!token) {
      //   // get cookie
      //   token = req.cookies.token;
      // }

      // var userData;
      // // if token exist and verified set authenticated
      // if (token) {
      //   // verify token
      //   const verifyOpts = jwt.getVerifyingOptions();
      //   const decodedToken = await jwt.verifyToken(token, verifyOpts);
      //   if (decodedToken) {
      //     isAuthenticated = true;
      //     userData = decodedToken;
      //   }
      // }

      // var images;
      // if (isAuthenticated) {
      //   images = await pictureRepository.getPicturesByUserId(userData.id);
      // } else {
      //   images = await pictureRepository.getAllPublicPictures();
      // }

      var images = await pictureRepository.getAllPictures();

      // check if file exits in the list.
      let img_file = "";
      for (const img of images) {
        if (img.title == filename) {
          img_file = img.url;
        }
      }

      if (!img_file) {
        // If the file does not exist, return a 404 error
        res.status(404).json({
          status: false,
          code: constants.http.StatusInternalServerError,
          error: "File not found",
          message: "File not found",
        });
        return;
      }

      // Construct the filepath
      const filePath = path.join(__dirname, "..", img_file);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Serve the file
        res.status(constants.http.StatusOK).sendFile(filePath);
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
  updateAPicture: async (req, res, next) => {
    try {
      const id = req.params.id;
      const userData = req.user;
      const pictureData = req.body;
      console.log(pictureData);
      const updatedPicture = await pictureRepository.updateUserPictureById(
        id,
        userData.id,
        pictureData
      );
      if (!updatedPicture) {
        return res.status(constants.http.StatusInternalServerError).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "failed to update the picture",
          message: err,
        });
      }
      res.status(constants.http.StatusOK).json({
        status: true,
        data: updatedPicture,
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
  deleteAPicture: async (req, res, next) => {
    try {
      const id = req.params.id;
      const userData = req.user;
      const deleted = await pictureRepository.deletePictureByIdAndUserId(
        id,
        userData.id
      );
      if (deleted.deletedCount == 0) {
        res.status(constants.http.StatusNotFound).json({
          status: false,
          code: constants.http.StatusNotFound,
          error: "Not found",
          message: "Not Found",
        });
        return;
      }
      res.status(constants.http.StatusOK).json({
        status: true,
        message: id + " deleted successfully",
        data: deleted,
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
