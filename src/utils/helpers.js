const jwt = require("jsonwebtoken");

// RESUSABLE FUNCTIONS

exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.MAX_AGE,
  });
};
