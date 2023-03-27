const {
  registerUserService,
  loginUserService,
  // refreshAccessTokenService,
} = require("../services/auth.service.js");

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

const signupPage = (request, response) => {
  response.render("signup", {
    title: "Signup",
  });
};

const userSignupController = async (request, response) => {
  const { email, password, firstname, lastname, nickname, profession } =
    request.body;

  try {
    const result = await registerUserService({
      firstname,
      lastname,
      email,
      nickname,
      profession,
      password,
    });
    const { status, error, message, newUser, token } = result;

    if (error) {
      return response.status(status).json({
        error,
        message,
      });
    }

    response.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      maximumAge: process.env.MAX_AGE,
    });

    return response.status(status).json({
      message,
      user: newUser.nickname,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "An error occurred while registering the user.",
    });
  }
};

const loginPage = (request, response) => {
  response.render("login", {
    title: "Login",
  });
};

const userLoginController = async (request, response) => {
  const { email, password } = request.body;

  try {
    const result = await loginUserService({
      email,
      password,
    });
    const { status, error, message, token, redirect } = result;

    if (error) {
      return response.status(status).json({
        error,
        message,
      });
    }

    response.cookie(process.env.JWT_NAME, token, {
      httpOnly: true,
      maximumAge: process.env.MAX_AGE,
    });

    response.status(status).json({
      success: true,
      message: message,
      redirect: redirect,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
//

module.exports = {
  signupPage,
  userSignupController,
  loginPage,
  userLoginController,
  // refreshAccessTokenController,
};

// const refreshAccessTokenController = async (request, response) => {
//   const { refreshToken } = request.body;

//   try {
//     const result = await refreshAccessTokenService(refreshToken);
//     const { accessToken, refreshToken } = result;

//     if (error) {
//       return response.status(status).json({
//         error,
//         message,
//       });
//     }

//     response.cookie(process.env.JWT_NAME, token, {
//       httpOnly: true,
//       maximumAge: process.env.MAX_AGE,
//     });

//     response.status(200).json({
//       success: true,
//       message: message,
//     });
//   } catch (error) {
//     return response.status(500).json({
//       error: true,
//       message: error.message,
//     });
//   }
// };
