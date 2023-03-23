import express from "express";
import {
  signupPage,
  userSignupController,
} from "../controllers/auth.controller.js";

// FILE IMPORTS

const authRouter = express.Router();
authRouter.get("/signup", signupPage);
authRouter.post("/signup", userSignupController);

export default authRouter;
