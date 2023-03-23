import express from "express";
import cookieParser from "cookie-parser";

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
app.set("view engine", "ejs");
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
