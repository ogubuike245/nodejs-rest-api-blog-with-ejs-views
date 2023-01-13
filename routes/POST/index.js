// const blogController = require("../controllers/blogController");

import {
  createNewBlogPost,
  editSingleBlogPost,
} from "../../controllers/blogControllers.js";

export const POST = (router) => {
  router.post("/", createNewBlogPost);
  router.post("/edit/:id", editSingleBlogPost);
};
