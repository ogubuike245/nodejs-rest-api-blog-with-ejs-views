const express = require("express");
const {
  createBlogPost,
  createBlogPostPage,
  blogPostsPage,
  getSingleBlogPostPage,
  editBlogPostPage,
  editBlogPost,
} = require("../../controllers/blog/blog.controller");
const {
  restrictToAuthenticatedUser,
} = require("../../middlewares/auth.middleware");

// FILE IMPORTS

const blogRouter = express.Router();

blogRouter.get("/posts", blogPostsPage);
blogRouter.get("/create", restrictToAuthenticatedUser, createBlogPostPage);
blogRouter.get("/post/:id", restrictToAuthenticatedUser, getSingleBlogPostPage);
blogRouter.post("/create/post", restrictToAuthenticatedUser, createBlogPost);
blogRouter.get("/edit/post/:id", restrictToAuthenticatedUser, editBlogPostPage);
blogRouter.post("/edit/post/:id", restrictToAuthenticatedUser, editBlogPost);

module.exports = blogRouter;
