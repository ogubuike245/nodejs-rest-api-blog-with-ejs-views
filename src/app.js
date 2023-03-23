import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

// FILE IMPORTS
import {
  allowedMethods,
  checkForLoggedInUser,
} from "./middlewares/auth.middleware.js";
import blogRoutes from "./routes/blog.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectToDatabase } from "./config/config.js";

//EXPRESS APP
const app = express();

// MONGODB CONNECTION
connectToDatabase(app);
// VIEW ENGINE REGISTRATION
// Set EJS as the view engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

// MIDDLEWARE AND STATIC FILES
app.use(express.static("./dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowedMethods);
app.use(checkForLoggedInUser);

//APP ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);

  // Determine the status code and error message to send to the client
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send the error response to the client
  res.status(statusCode).json({ error: true, message });
};

// Register the error handling middleware function
app.use(errorHandler);
