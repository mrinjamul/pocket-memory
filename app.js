var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var app = express();

// Get Service config and environments
const config = require("./config").getConfig();

// Connect to the database
const mongoose = require("mongoose");

mongoose
  .connect(config.database.url, {
    dbName: config.database.name,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // cors for cross origin access

// Import routers

var indexRouter = require("./routes/index");
// var authRouter = require("./routes/auth");

app.use("/", indexRouter);
// app.use("/auth", authRouter);

module.exports = app;
