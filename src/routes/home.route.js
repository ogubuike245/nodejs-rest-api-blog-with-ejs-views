const express = require("express");
const { homePage } = require("../controllers/home.controller");

// FILE IMPORTS

const homeRouter = express.Router();
homeRouter.get("/", homePage);
module.exports = homeRouter;
