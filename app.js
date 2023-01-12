import express from "express";
import morgan from "morgan";

// FILE IMPORTS
import { connectToDatabase } from "./database/mongoDatabase.js";
import blogRoutes from "./routes/blogRoutes.js";

//EXPRESS APP
const app = express();

// MONGODB CONNECTION

connectToDatabase(app);

// VIEW ENGINE REGISTRATION
app.set("view engine", "ejs");

// MIDDLEWARE AND STATIC FILES
app.use(express.static("./dist"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((request, response, next) => {
  response.locals.path = request.path;
  next();
});

// APP PAGE ROUTES
app.get("/", (request, response) => {
  response.redirect("/blogs");
  // console.log(request);
});

app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
  // console.log(request);
});

// APP BLOG ROUTES
app.use("/blogs", blogRoutes);

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
  console.log(request);
});
