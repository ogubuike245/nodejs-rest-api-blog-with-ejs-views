import { deleteBlog } from "../../controllers/blogControllers.js";

//FIXME: DELETE A BLOG DOCUMENT FROM THE MONGODB DATABASE
export const DELETE = (router) => {
  router.delete("/:id", deleteBlog);
};
