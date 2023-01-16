// import moment from "moment";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { config } from "dotenv";
config();

const {JWT_SECRET} = process.env;

// console.log(JWT_SECRET)

// ERROR HANDLERS
const handleErrors = (errorInfo) => {
  console.log(errorInfo.message, errorInfo.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (errorInfo.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (errorInfo.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (errorInfo.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (errorInfo.message.includes("user validation failed")) {
    Object.values(errorInfo.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//CREATE A JSON WEB TOKEN
const maximumAge = 3 * 24 * 60 * 60;
const createToken = (id) => {

  return jwt.sign({ id },JWT_SECRET, {
    expiresIn: maximumAge,
  });
};

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
  const { email, password } = request.body;

  try {
    const user = await User.create({ email, password });
    // const user = await new User({ email, password });


    const token = createToken(user._id);
    response.cookie("jwt", token, {
      httpOnly: true,
      maximumAge: maximumAge * 1000,
    });
    response.status(201).json({ user: user._id });
    console.log(user)
  } catch (err) {
    const errors = handleErrors(err);
    response.status(400).json({ errors: "I SEE YOU" });
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
    const errors = handleErrors(error);
    response.status(400).json({ errors });
  }
};

export const userLogout = async (request, response) => {
  response.cookie("jwt", "", { maximumAge: 1 });
  response.redirect("/");
};
