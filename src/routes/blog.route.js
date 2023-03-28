const express = require("express");
const {
  createBlogPost,
  createBlogPostPage,
  blogPostsPage,
  getSingleBlogPostPage,
} = require("../controllers/blog.controller");

// FILE IMPORTS

const blogRouter = express.Router();

blogRouter.get("/posts", blogPostsPage);
blogRouter.get("/create", createBlogPostPage);
blogRouter.get("/post/:id", getSingleBlogPostPage);
blogRouter.post("/create/post", createBlogPost);

module.exports = blogRouter;
