import express from "express";
import morgan from "morgan";
// import apicache from "apicache";

//

// FILE IMPORTS
import { connectToDatabase } from "./database/mongoDatabase.js";
import { middleWares } from "./middlewares/index.js";
import blogRoutes from "./routes/blogRoutes.js";

//EXPRESS APP
const app = express();

// MONGODB CONNECTION

connectToDatabase(app);

// VIEW ENGINE REGISTRATION
app.set("view engine", "ejs");

// MIDDLEWARE AND STATIC FILES
middleWares(app, express, morgan);
app.use((request, response, next) => {
  response.locals.path = request.path;
  next();
});

// const cache = apicache.middleware;
// app.use(cache("2 minutes"));

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

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
  // console.log(request);
});
