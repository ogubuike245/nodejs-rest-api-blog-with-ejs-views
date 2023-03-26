// import packages
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

// import database config
const { connectToDatabase } = require("./config/config.js");

// import middlewares
const {
  allowedMethods,
  checkForLoggedInUser,
  setNavLinksLocals,
  errorHandler,
} = require("./middlewares/auth.middleware.js");

// import app routes
const homeRoute = require("./routes/home.route.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");
const blogRoutes = require("./routes/blog.route.js");

// app configurations
const app = express();
connectToDatabase(app);

//middleware and statics
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));
app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(setNavLinksLocals);

// Add content security policy middleware
app.use(allowedMethods);
app.use(checkForLoggedInUser);

// app routes
app.use("/", homeRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use((_, response) => {
  response.render("404", {
    title: "Error",
  });
});

app.use(errorHandler);

module.exports = app;
