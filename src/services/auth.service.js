const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { createToken } = require("../utils/helpers");

exports.registerUserService = async function (userData) {
  try {
    const { email, password, firstname, lastname, nickname } = userData;

    const existingUser = await User.findOne({ email });
    const existingNickname = await User.findOne({ nickname });

    if (existingUser) {
      return {
        error: true,
        message:
          "A user with that email address already exists. Please try again with a different email address or log in to your existing account.",
        status: 400,
      };
    }
    if (existingNickname) {
      return {
        error: true,
        message:
          "A user with that nickname already exists. Please try again with a different nickname.",
        status: 400,
      };
    }

    // Hash password and save the user data along with the encrypted OTP in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      firstname,
      lastname,
      nickname,
      password: hashedPassword,
    });

    await newUser.save();
    const token = createToken(newUser._id);
    return {
      success: true,
      message: "Registration successful!",
      status: 201,
      newUser,
      token,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};

exports.loginUserService = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        error: true,
        status: 404,
        message:
          "The email address provided does not match any existing accounts. Please double-check the email address or create a new account.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        error: true,
        status: 401,
        message:
          "Incorrect email or password. Please make sure you have entered the correct email and password combination.",
      };
    }

    const token = createToken(user._id);
    return {
      success: true,
      status: 200,
      message: "login Successful",
      redirect: "/",
      token,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
