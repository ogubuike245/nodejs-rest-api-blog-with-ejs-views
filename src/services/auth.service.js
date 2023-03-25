const bcrypt = require("bcrypt");
const User = require("../models/user.model");

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

    return {
      success: true,
      message: "Registration successful!",
      status: 201,
      newUser,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
