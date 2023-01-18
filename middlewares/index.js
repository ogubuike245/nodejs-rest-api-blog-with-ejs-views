import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { config } from "../config/config.js";

const { JWT_SECRET } = config;

export const requireAuth = (request, response, next) => {
  const token = request.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        response.redirect("/api/v1/user/login");
      } else {
        console.log("TOKEN DECODED");
        next();
      }
    });
  } else {
    response.redirect("/api/v1/user/login");
  }
};

// check current user
export const checkUser = (request, response, next) => {
  const token = request.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (error, decodedToken) => {
      if (error) {
        response.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        response.locals.user = user;
        next();
      }
    });
  } else {
    response.locals.user = null;
    next();
  }
};
