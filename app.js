import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import apicache from "apicache";

// FILE IMPORTS
import { connectToDatabase } from "./config/database/mongoDatabase.js";
import { middleWares } from "./middlewares/index.js";
import blogRoutes from "./routes/Blog/blogRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";

//EXPRESS APP
const app = express();
// config();

// MONGODB CONNECTION
const cache = apicache.middleware;
// app.use(cache("2 minutes"));
cache("2 minutes"), connectToDatabase(app, config);

// MIDDLEWARE AND STATIC FILES
middleWares(app, express, morgan);
app.use((request, response, next) => {
  response.locals.path = request.path;
  // response.locals.message = request.session.message;
  // delete request.session.message;
  next();
});
// VIEW ENGINE REGISTRATION
app.set("view engine", "ejs");

// APP PAGE ROUTES
app.get("/", (request, response) => {
  response.redirect("/api/blogs");
  // console.log(request);
});

app.get("/api/about", (request, response) => {
  response.render("about", { title: "About" });
  // console.log(request);
});

// APP BLOG ROUTES
app.use("/api/blogs", blogRoutes);

//  BLOG USER ROUTES
app.use("/api/user", userRoutes);

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
  // console.log(request);
});
