const User = require("../models/user");

const bcrypt = require("../helpers/bcrypt");

const userRepository = {
  // createUser: creates user in the database
  createUser: async function (user) {
    try {
      const newUser = new User(user);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },
  // getUser: return user object
  getAllUsers: async function () {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  },
  // Get a user by username from the database
  getUserByUsername: async function (username) {
    try {
      return await User.findOne({ username });
    } catch (error) {
      throw new Error(`Error getting user by username: ${error.message}`);
    }
  },

  // Check if a password is valid for a user by username
  isPasswordValid: async function (username, password) {
    try {
      // Find the user by username
      const user = await User.findOne({ username });

      // If user not found, return false
      if (!user) {
        return false;
      }

      // Compare the provided password with the hashed password stored in the database
      return await bcrypt.verifyHash(password, user.password);
    } catch (error) {
      throw new Error(`Error checking password validity: ${error.message}`);
    }
  },

  // Change password for a user by username
  changePasswordByUsername: async function (username, newPassword) {
    try {
      // Find the user by username
      const user = await User.findOne({ username });

      // If user not found, throw error
      if (!user) {
        throw new Error("User not found");
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hashAndSalt(newPassword);

      // Update the user's password
      user.password = newPassword;

      // Save the updated user
      return await user.save();
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  },
  // Update a user by username in the database
  updateUserByUsername: async function (username, userDataToUpdate) {
    try {
      return await User.findOneAndUpdate({ username }, userDataToUpdate, {
        new: true,
      });
    } catch (error) {
      throw new Error(`Error updating user by username: ${error.message}`);
    }
  },

  // Delete a user by username from the database
  deleteUserByUsername: async function (username) {
    try {
      return User.findOneAndDelete({ username });
    } catch (error) {
      throw new Error(`Error deleting user by username: ${error.message}`);
    }
  },
};

module.exports = userRepository;
