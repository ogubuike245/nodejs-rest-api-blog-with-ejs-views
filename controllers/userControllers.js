// import moment from "moment";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
import User from "../models/userModel.js";
import { handleErrors } from "./errorHandling.js";
config();

const { JWT_SECRET } = process.env;

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

export const signupPage = (request, response) => {
  response.render("signup", {
    title: "Signup",
  });
};

export const loginPage = (request, response) => {
  response.render("login", {
    title: "Login",
  });
};
export const userSignup = async (request, response) => {
  const { email, password, firstname, lastname, nickname } = request.body;

  try {
    const user = await User.create({
      email,
      password,
      firstname,
      lastname,
      nickname,
    });
    // const user = await new User({ email, password });

    const token = createToken(user._id);
    response.cookie("jwt", token, {
      httpOnly: true,
      maximumAge: maximumAge * 1000,
    });
    response.status(201).json({ user: user._id });
    console.log(user);
  } catch (error) {
    // ERROR HANDLERS

    const errors = handleErrors(error);
    response.status(400).json({ errors });
  }
};

export const userLogin = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    response.cookie("jwt", token, {
      httpOnly: true,
      maximumAge: maximumAge * 1000,
    });
    response.status(200).json({ user: user._id });
  } catch (error) {
    // ERROR HANDLERS

    const errors = handleErrors(error);
    response.status(400).json({ errors });
  }
};

export const userLogout = async (request, response) => {
  response.cookie("jwt", "", { maximumAge: 1 });
  response.redirect("/");
};

//CREATE A JSON WEB TOKEN
const maximumAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: maximumAge,
  });
};
