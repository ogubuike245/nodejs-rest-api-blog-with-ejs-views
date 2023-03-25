const express = require("express");
const {
  signupPage,
  userSignupController,
  userLoginController,
  loginPage,
} = require("../controllers/auth.controller.js");

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.get("/login", loginPage);
authRouter.post("/signup", userSignupController);
authRouter.post("/login", userLoginController);

module.exports = authRouter;
