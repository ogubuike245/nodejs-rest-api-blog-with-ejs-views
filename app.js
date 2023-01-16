import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

// import morgan from "morgan";
// import apicache from "apicache";

// FILE IMPORTS
import { connectToDatabase } from "./config/database/mongoDatabase.js";
import { checkUser } from "./middlewares/index.js";
import blogRoutes from "./routes/Blog/blogRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";

//EXPRESS APP
const app = express();
config();
connectToDatabase(app);

// MIDDLEWARE AND STATIC FILES
app.use(express.static("./dist"));
app.use(express.json());
app.use(cookieParser());
app.use((request, response, next) => {
  response.locals.path = request.path;
  next();
});
// app.use(morgan("dev"));
// VIEW ENGINE REGISTRATION
app.set("view engine", "ejs");

// MONGODB CONNECTION
// const cache = apicache.middleware;
// app.use(cache("2 minutes"));

// APP PAGE ROUTES
app.get("*", checkUser);
app.get("/", (request, response) => {
  response.redirect("/api/blogs");
  // console.log(request);
});

app.get("/api/about", (request, response) => {
  response.render("about", { title: "About" });
  // console.log(request);
});

//  BLOG USER ROUTES
app.use("/api/user", userRoutes);
// APP BLOG ROUTES
app.use("/api/blogs", blogRoutes);

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
  // console.log(request);
});
