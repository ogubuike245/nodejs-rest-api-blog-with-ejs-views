const userLogout = async (req, res) => {
  res.clearCookie(process.env.JWT_NAME);
  res.redirect("/");
};

module.exports = {
  userLogout,
};
