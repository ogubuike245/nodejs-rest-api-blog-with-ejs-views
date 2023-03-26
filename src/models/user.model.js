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
  profession: {
    type: String,
    required: [true, "Please Select a Profession"],
    minlength: [5, "Minimum  length is 5 characters"],
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

const User = mongoose.model("User", userSchema);

module.exports = User;
