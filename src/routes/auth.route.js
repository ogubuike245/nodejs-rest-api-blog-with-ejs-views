const express = require("express");
const {
  signupPage,
  userSignupController,
  userLoginController,
  loginPage,
  // refreshAccessTokenController,
} = require("../controllers/auth.controller.js");

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.get("/login", loginPage);
authRouter.post("/signup", userSignupController);
authRouter.post("/login", userLoginController);
// authRouter.post("/refresh-token", refreshAccessTokenController);

module.exports = authRouter;
