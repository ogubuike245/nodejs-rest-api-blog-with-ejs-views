import { registerUserService } from "../services/auth.service.js";

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

export const signupPage = (request, response) => {
  response.send("signup");
  // response.render("signup", {
  //   title: "Signup",
  // });
};

export const userSignupController = async (request, response) => {
  const { email, password, firstname, lastname, nickname } = request.body;

  try {
    const result = await registerUserService({
      email,
      password,
      firstname,
      lastname,
      nickname,
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
