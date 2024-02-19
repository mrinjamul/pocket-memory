const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  url: String,
  dateTaken: Date,
  location: String,
  tags: [String],
  privacy: { type: String, enum: ["public", "private", "shared"] },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
