const express = require("express");

const {
  userLogout,
  getUserProfile,
} = require("../controllers/user.controller.js");

// FILE IMPORTS

const userRouter = express.Router();

userRouter.get("/profile/:id", getUserProfile);
userRouter.get("/logout", userLogout);

module.exports = userRouter;
