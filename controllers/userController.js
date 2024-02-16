const userRepository = require("../repository/userRepository");

const constants = require("../constants");

const bcrypt = require("../helpers/bcrypt");

const { maskUser } = require("../helpers/utils");

const jwt = require("../helpers/jwt");

const userController = {
  // get user profile
  getProfile: async function (req, res, next) {
    try {
      // get user param
      const username = req.params.username;

      // get user info from database
      const user = await userRepository.getUserByUsername(username);
      // check if user exists
      if (!user) {
        res.status(constants.http.StatusNotFound).json({
          status: false,
          code: constants.http.StatusNotFound,
          error: "not found",
          message: "no user found",
          data: null,
        });
        return;
      }

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

      // if token exist and verified set authenticated
      if (token) {
        // verify token
        const verifyOpts = jwt.getVerifyingOptions();
        const decodedToken = await jwt.verifyToken(token, verifyOpts);
        if (decodedToken) {
          if (decodedToken.username == user.username) {
            isAuthenticated = true;
          }
        }
      }

      const maskedUser = maskUser(user, isAuthenticated);

      res.status(constants.http.StatusOK).json({
        status: true,
        data: maskedUser,
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

module.exports = userController;
