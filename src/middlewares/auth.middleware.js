const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

// CHECK IF THERE IS A LOGGED IN USER FROM THE JWT TOKEN

const checkForLoggedInUser = async (request, res, next) => {
  try {
    const token = request.cookies.jwt;
    if (!token) return next();

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) return res.redirect("/api/v1/auth/signup");

    request.user = res.locals.user = user;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // Token has expired, clear cookie and return error response
      res.clearCookie("jwt");
      res.status(401).json({
        error: true,
        message: "Session has expired. Please log in again.",
      });
    } else {
      // Other errors, log and return error response
      console.error(err);
      request.user = res.locals.user = null;
      return next(err);
    }
  }
};

// CHECK FOR IF THE USER IS LOGGED IN BEFORE REDIRECTING USER
const isLoggedIn = (request, response, next) => {
  if (request.user) {
    response.redirect("/");
  } else {
    next();
  }
};

// CHECK TO SEE IF THE JSON WEB TOKEN EXISTS AND ALSO IF THE TOKEN HAS BEEN VERIFIED
const tokenVerification = async (request, res, next) => {
  try {
    const token = request.cookies.jwt;

    if (!token) {
      return res.redirect("/api/v1/auth/login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    // Attach user ID to request object and response locals

    request.user = res.locals.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res.redirect("/api/v1/auth/login");
  }
};

const allowedMethods = async (request, response, next) => {
  // List of allowed HTTP methods
  const Methods = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  // Checking if the requested method is not allowed
  if (!Methods.includes(request.method)) {
    // Sending an error response with status code 405 and a message indicating the not allowed method
    response.status(405).send(`${request.method} not allowed`);
  } else {
    // Calling the next middleware function if the requested method is allowed
    next();
  }
};

module.exports = {
  tokenVerification,
  isLoggedIn,
  checkForLoggedInUser,
  allowedMethods,
};
