const { registerUserService } = require("../services/auth.service.js");
const { createToken } = require("../utils/helpers.js");

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

const signupPage = (request, response) => {
  response.render("signup", {
    title: "Signup",
  });
};

const userSignupController = async (request, response) => {
  const { email, password, firstname, lastname, nickname } = request.body;

  console.log(request.body);
  try {
    const result = await registerUserService({
      firstname,
      lastname,
      email,
      nickname,
      password,
    });
    const { status, error, message, newUser } = result;

    if (error) {
      console.log(error);
      return response.status(status).json({
        error,
        message,
      });
    }

    const token = createToken(newUser._id);
    response.cookie("jwt", token, {
      httpOnly: true,
      maximumAge: process.env.MAX_AGE,
    });

    return response.status(status).json({
      message,
      user: newUser._id,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "An error occurred while registering the user.",
    });
  }
};

module.exports = {
  signupPage,
  userSignupController,
};
