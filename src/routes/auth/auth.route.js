const express = require("express");
const {
  signupPage,
  userSignupController,
  userLoginController,
  loginPage,
  // refreshAccessTokenController,
} = require("../controllers/auth/auth.controller.js");
const { isLoggedIn } = require("../../middlewares/auth.middleware.js");

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.get("/login", isLoggedIn, loginPage);
authRouter.post("/signup", userSignupController);
authRouter.post("/login", userLoginController);
// authRouter.post("/refresh-token", refreshAccessTokenController);

module.exports = authRouter;
