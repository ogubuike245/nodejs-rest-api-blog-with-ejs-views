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
  setNavLinksLocals,
  errorHandler,
} = require("./middlewares/auth.middleware.js");
// const blogRoutes = require("./routes/blog.route.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");
const { connectToDatabase } = require("./config/config.js");

const app = express();

connectToDatabase(app);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

app.use(express.static(path.join(path.resolve(), "src/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());

// Add content security policy middleware

app.use(allowedMethods);
app.use(checkForLoggedInUser);
app.use(setNavLinksLocals);
// app.use((request, res, next) => {
//   res.locals.user = request.user;
//   console.log(res.locals.user);
//   next();
// });

app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
  });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/blog", blogRoutes);

app.use((_, response) => {
  response.render("404", {
    title: "Error",
  });
});

app.use(errorHandler);

module.exports = app;
