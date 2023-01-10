// const express = require("express");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const blogRoutes = require("./routes/blogRoutes");
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { PORT, MONG0_DB_URL } = process.env;

import blogRoutes from "./routes/blogRoutes.js";

//EXPRESS APP
const app = express();

//LISTEN FOR REQUESTS
app.listen(PORT || 8040);

// MONGODB CONNECTION

mongoose
  .set("strictQuery", false)
  .connect(MONG0_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(result.models);
    })
  )
  .catch((err) => console.log(err));

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

// const http = require("http");
// const fs = require("fs");
// const _ = require("lodash");
// const PORT = 3000;
// const SUCCESS_CODE = 200;
// const NOT_FOUND = 400;

// const server = http.createServer((request, response) => {
//   // console.log(request.url, request.method);

//   const number = _.random(0, 30);
//   console.log(number);
//   //   set header content type
//   response.setHeader("Content-Type", "text/html");
//   //   response.write("<h1>OGUBUIKE EMEJURU</h1>");
//   //   response.end();

//   let path = "./views/";

//   switch (request.url) {
//     case "/":
//       path += "index.html";
//       response.statusCode = SUCCESS_CODE;
//       break;
//     case "/about":
//       path += "about.html";
//       response.statusCode = SUCCESS_CODE;
//       break;
//     case "/about-me":
//       path += "about.html";
//       response.statusCode = 301;
//       response.setHeader("Location", "/about");
//       response.end();
//       break;
//     default:
//       path += "404.html";
//       response.statusCode = NOT_FOUND;
//       break;
//   }

//   //   send an HTML FILE
//   fs.readFile(path, (error, data) => {
//     if (error) {
//       console.log(error);
//       response.end();
//     } else {
//       // you can use response.write() when doing multiple readings
//       //   response.write(data);

//       response.end(data);
//     }
//   });
// });

// server.listen(PORT, "localhost", () => {
//   console.log(`listening for request on port ${PORT}`);
// });
