const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter Your Firstname"],
    // maxlength: [128, "Minimum password length is 6 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter Your Lastname"],
    // minlength: [6, "Minimum password length is 6 characters"],
  },
  nickname: {
    type: String,
    required: [true, "Please Type In a Nickname"],
    minlength: [3, "Minimum  length is 3 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
