import express from "express";
import cookieParser from "cookie-parser";

// FILE IMPORTS
import { connectToDatabase } from "./config/mongoDatabase.js";
import { checkUser } from "./middlewares/index.js";
import blogRoutes from "./routes/Blog/blogRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";

//EXPRESS APP
const app = express();
// config();
// MONGODB CONNECTION
connectToDatabase(app);

// MIDDLEWARE AND STATIC FILES
app.use(express.static("./dist"));
app.use(express.json());
app.use(cookieParser());


// VIEW ENGINE REGISTRATION
app.set("view engine", "ejs");

// APP PAGE ROUTES
app.user(checkUser);
app.get("/", (request, response) => {
  response.redirect("/api/v1/blogs");
});

app.get("/api/v1/about", (request, response) => {
  response.render("about", { title: "About" });
});

//  BLOG USER ROUTES
app.use("/api/v1/user", userRoutes);
// APP BLOG ROUTES
app.use("/api/v1/blogs", blogRoutes);

// APP 404 PAGE
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
});
