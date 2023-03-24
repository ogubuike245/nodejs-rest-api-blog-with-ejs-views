const express = require("express");
const {
  signupPage,
  userSignupController,
} = require("../controllers/auth.controller.js");

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.post("/signup", userSignupController);

module.exports = authRouter;
