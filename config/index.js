// import Environment variables
const dotenv = require("dotenv");

dotenv.config();

// Create a config object to hold the application settings
const config = {
  server: {
    appMode: process.env.APP_MODE || "dev",
    address: process.env.ADDRESS || "localhost",
    port: process.env.PORT || 4000,
  },
  database: {
    name: process.env.DB_NAME || "test",
    url: process.env.DB_URL || "mongodb://localhost:27017/test",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
};

module.exports = {
  getConfig: function () {
    return config;
  },
};
