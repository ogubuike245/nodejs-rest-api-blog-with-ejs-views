const { registerUserService } = require("../services/auth.service.js");

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

const signupPage = (request, response) => {
  response
    .status(200)
    .json({
      text: "Signup",
    })
    .render("signup", {
      title: "Signup",
    });
};

const userSignupController = async (request, response) => {
  const { email, password, firstname, lastname, nickname } = request.body;

  try {
    const result = await registerUserService({
      firstname,
      lastname,
      email,
      nickname,
      password,
    });
    const { status, error, message } = result;

    if (error) {
      return response.status(status).json({
        error,
        message,
      });
    }

    return response.status(status).json({
      message,
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
