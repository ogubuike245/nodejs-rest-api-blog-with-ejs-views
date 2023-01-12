// const blogController = require("../controllers/blogController");
import express from "express";
import {
  createNewBlogPage,
  getAllBlogs,
  createNewBlogPost,
  getDetailsOfSingleBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();
router.get("/create", createNewBlogPage);
router.get("/", getAllBlogs);
router.post("/", createNewBlogPost);
router.get("/:id", getDetailsOfSingleBlog);
router.delete("/:id", deleteBlog);

export default router;
