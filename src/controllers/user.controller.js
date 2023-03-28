const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res
      .status(200)
      .render("profile", { success: true, user, title: "PROFILE PAGE" });
  } catch (error) {
    console.log(error);
  }
};
const userLogout = async (req, res) => {
  res.clearCookie(process.env.JWT_NAME);
  res.redirect("/");
};

module.exports = {
  userLogout,
  getUserProfile,
};
