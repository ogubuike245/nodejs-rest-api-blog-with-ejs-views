const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const {
  allowedMethods,
  checkForLoggedInUser,
} = require("./middlewares/auth.middleware.js");
const blogRoutes = require("./routes/blog.route.js");
const authRoutes = require("./routes/auth.route.js");
const { connectToDatabase } = require("./config/config.js");

const app = express();

connectToDatabase(app);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

app.use(express.static("./dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(allowedMethods);
app.use(checkForLoggedInUser);

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/blog", blogRoutes);

app.use((_, response) => {
  return response.status(404).json({
    message: "404",
  });
});

// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({ error: true, message });
// };

// app.use(errorHandler);

module.exports = app;
