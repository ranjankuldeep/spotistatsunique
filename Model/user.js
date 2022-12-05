const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  spotifyId: String,
  thumbnail: String,
});

module.exports = mongoose.model("User", userSchema);
