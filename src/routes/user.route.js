const express = require("express");

const { userLogout } = require("../controllers/user.controller.js");

// FILE IMPORTS

const userRouter = express.Router();

userRouter.get("/logout", userLogout);

module.exports = userRouter;
