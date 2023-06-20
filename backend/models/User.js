const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  birthDate: Date,
  location: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
