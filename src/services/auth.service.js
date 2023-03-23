import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const registerUserService = async function (userData) {
  try {
    const { email, password, firstname, lastname, nickname } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        error: true,
        message:
          "A user with that email address already exists. Please try again with a different email address or log in to your existing account.",
        status: 400,
      };
    }

    // Hash password and save the user data along with the encrypted OTP in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      email,
      firstname,
      lastname,
      nickname,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
      message: "Registration successful! ",
      status: 201,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
