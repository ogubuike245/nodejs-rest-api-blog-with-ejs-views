const express = require("express");
const { blogPosts, createBlogPost } = require("../controllers/blog.controller");

// FILE IMPORTS

const blogRouter = express.Router();

blogRouter.get("/posts", blogPosts);
blogRouter.post("/create/post", createBlogPost);

module.exports = blogRouter;
