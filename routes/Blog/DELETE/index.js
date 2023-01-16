import { deleteBlog } from "../../../controllers/blogControllers.js";
import { requireAuth } from "../../../middlewares/index.js";

/**
 *  DELETE A BLOG DOCUMENT FROM THE MONGODB DATABASE
 * @param REQUEST_METHOD: DELETE - TYPE OF REQUEST
 */
export const DELETE = (router) => {
  router.delete("/:id", requireAuth, deleteBlog);
};
