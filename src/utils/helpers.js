const jwt = require("jsonwebtoken");

// RESUSABLE FUNCTIONS

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.MAX_AGE,
  });
};

function verifyRefreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    // Handle token verification errors
    throw new Error("Invalid refresh token");
  }
}

function generateRefreshToken(userId) {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "7d",
  });
  return refreshToken;
}

module.exports = {
  verifyRefreshToken,
  createToken,
  generateRefreshToken,
};
