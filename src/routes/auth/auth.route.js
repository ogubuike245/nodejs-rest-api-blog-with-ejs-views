const express = require("express");
const {
  signupPage,
  userSignupController,
  userLoginController,
  loginPage,
} = require("../../controllers/auth/auth.controller");
const { isLoggedIn } = require("../../middlewares/auth.middleware");

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.get("/login", isLoggedIn, loginPage);
authRouter.post("/signup", userSignupController);
authRouter.post("/login", userLoginController);

module.exports = authRouter;
