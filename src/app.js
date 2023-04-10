// import packages
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

// import middlewares
const {
  allowedMethods,
  checkForLoggedInUser,
  errorHandler,
} = require("./middlewares/auth.middleware");

// import app routes
const homeRoute = require("./routes/home.route");
const authRoutes = require("./routes/auth/auth.route");
const userRoutes = require("./routes/user/user.route");
const blogRoutes = require("./routes/blog/blog.route");

// app configurations
const app = express();

//middleware and statics
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());

// Add content security policy middleware
app.use(checkForLoggedInUser);
app.use(allowedMethods);

// app routes
app.use("/", homeRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", checkForLoggedInUser, userRoutes);
app.use("/api/v1/blog", checkForLoggedInUser, blogRoutes);

app.use((_, response) => {
  response.render("404", {
    title: "Error",
  });
});

app.use(errorHandler);

module.exports = app;
