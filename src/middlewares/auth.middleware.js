const jwt = require("jsonwebtoken");
const User = require("../models/user/user.model");

// CHECK IF THERE IS A LOGGED IN USER FROM THE JWT TOKEN
const checkForLoggedInUser = async (request, res, next) => {
  try {
    const jwt_token = request.cookies.JWT_NAME;

    if (!jwt_token) {
      return next();
    }

    const decodedToken = jwt.verify(jwt_token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.clearCookie("JWT_NAME");
    } else {
      request.user = res.locals.user = user;
      return next();
    }
  } catch (err) {
    console.error(err);
    request.user = res.locals.user = null;
    return next();
  }
};

const restrictToAuthenticatedUser = (request, res, next) => {
  if (!request.user) {
    // Redirect to login page if user is not authenticated
    return res.redirect("/api/v1/auth/login");
  }
  // Allow user to proceed to the next middleware function
  next();
};

const restrictToReadAccess = (request, res, next) => {
  // Check if user has read access to the current route
  if (request.method === "GET") {
    // Allow user to proceed to the next middleware function if the request method is GET
    next();
  } else {
    // Redirect to home page if user does not have read access
    return res.redirect("/");
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

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: true, message });
};

module.exports = {
  isLoggedIn,
  checkForLoggedInUser,
  allowedMethods,
  restrictToAuthenticatedUser,
  errorHandler,
};
