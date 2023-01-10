// const blogController = require("../controllers/blogController");
import express from "express";
import {
  blog_create_get,
  blog_index,
  blog_create_post,
  blog_details,
  blog_delete,
} from "../controllers/blogController.js";

const router = express.Router();
router.get("/create", blog_create_get);
router.get("/", blog_index);
router.post("/", blog_create_post);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);

export default router;
