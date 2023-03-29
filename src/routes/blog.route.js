const express = require("express");
const {
  createBlogPost,
  createBlogPostPage,
  blogPostsPage,
  getSingleBlogPostPage,
  editBlogPostPage,
  editBlogPost,
} = require("../controllers/blog.controller");

// FILE IMPORTS

const blogRouter = express.Router();

blogRouter.get("/posts", blogPostsPage);
blogRouter.get("/create", createBlogPostPage);
blogRouter.get("/post/:id", getSingleBlogPostPage);
blogRouter.post("/create/post", createBlogPost);

blogRouter.get("/edit/post/:id", editBlogPostPage);
blogRouter.post("/edit/post/:id", editBlogPost);

module.exports = blogRouter;
