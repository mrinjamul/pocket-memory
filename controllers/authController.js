const userRepository = require("../repository/userRepository");

const constants = require("../constants");

const bcrypt = require("../helpers/bcrypt");

const jwt = require("../helpers/jwt");

const { cookieConfig } = require("../helpers/cookie");

const { maskUser } = require("../helpers/utils");

const authController = {
  // createUser: handle the user creation request
  signup: async function (req, res, next) {
    try {
      // get info from req body
      const { name, username, email, password } = req.body;
      if (!username && !email) {
        // return as invalid request, data missing.
        res.status(constants.http.StatusBadRequest).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "Bad Request",
          message: "missing username or email",
        });
        return;
      }
      if (!password) {
        // return as invalid request, data missing.
        res.status(constants.http.StatusBadRequest).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "Bad Request",
          message: "missing password",
        });
        return;
      }

      // if (password != confirmPassword) {
      //   // respond password didn't matched.
      // }

      // check if user exist
      const oldUser = await userRepository.getUserByUsername(username);
      if (oldUser) {
        res.status(constants.http.StatusConflict).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "Conflict",
          message: "user already exists",
        });
        return;
      }

      // hash password
      const hashedPassword = await bcrypt.hashAndSalt(password);

      const userData = {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      };

      const user = await userRepository.createUser(userData);
      // if err occurs then return with error
      if (!user) {
        res.status(constants.http.StatusInternalServerError).json({
          status: false,
          code: constants.http.StatusInternalServerError,
          error: "failed to create user",
          message: "failed to create user",
        });
        return;
      }

      const maskedUser = maskUser(user, true);

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
  // login: handle logining into the server
  login: async function (req, res, next) {
    try {
      // get login credentials
      const { username, email, password } = req.body;
      if ((!username && !email) || !password) {
        res.status(constants.http.StatusBadRequest).json({
          code: constants.http.StatusBadRequest,
          error: "Bad Request",
          message: "username or email is missing",
        });
        return;
      }

      // get user infor from database
      let user;
      if (email) {
        user = await userRepository.getUserByEmail(email);
      } else if (username) {
        user = await userRepository.getUserByUsername(username);
      }
      if (!user) {
        res.status(constants.http.StatusNotFound).json({
          status: false,
          code: constants.http.StatusNotFound,
          error: "not found",
          message: "no user found",
        });
        return;
      }

      const maskedUser = maskUser(user, true);

      // validate password
      const isVerified = await bcrypt.verifyHash(password, user.password);
      // Generate the token
      const signingOpts = jwt.getSigningOptions(user.username);
      const payload = jwt.getPayload(user);
      const newToken = jwt.issueToken(payload, signingOpts);

      // get cookie
      const token = req.cookies.token;

      if (token) {
        // if token is invalid, generate a new token and then respond
        const verifyOpts = jwt.getVerifyingOptions();
        const decodedToken = jwt.verifyToken(token, verifyOpts);
        if (!decodedToken) {
          if (isVerified) {
            // set token to cookie
            res.cookie("token", newToken, cookieConfig);

            res.status(constants.http.StatusOK).json({
              status: true,
              message: "success",
              token: newToken,
              data: maskedUser,
            });
          } else {
            // clear token cookie
            res.clearCookie("token");
            res.status(constants.http.StatusOK).json({
              status: false,
              message: "invalid token",
            });
          }
          return;
        }

        // else return all ready logged in
        res.status(constants.http.StatusOK).json({
          status: true,
          message: "user already logged in",
          token: token,
          data: maskedUser,
        });
        return;
      }

      if (isVerified) {
        // set token to cookie
        res.cookie("token", newToken, cookieConfig);

        res.status(constants.http.StatusOK).json({
          status: true,
          message: "success",
          token: newToken,
          data: maskedUser,
        });
        return;
      } else {
        res.status(constants.http.StatusBadRequest).json({
          status: false,
          code: constants.http.StatusBadRequest,
          error: "invalid request",
          message: "invalid password",
        });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(constants.http.StatusInternalServerError).json({
        status: false,
        code: constants.http.StatusInternalServerError,
        error: "Internal Server Error",
        message: err,
      });
    }
  },
  // logout: handle logout from the server
  logout: async function (req, res, next) {
    try {
      // get cookie
      const token = req.cookies.token;
      if (!token) {
        res.status(constants.http.StatusOK).json({
          status: false,
          message: "user not logged in",
        });
        return;
      }
      // clear token cookie
      res.clearCookie("token");

      res.status(constants.http.StatusOK).json({
        status: true,
        message: "log out successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(constants.http.StatusInternalServerError).json({
        status: false,
        code: constants.http.StatusInternalServerError,
        error: "Internal Server Error",
        message: err,
      });
    }
  },
};

module.exports = authController;
