import {
  createNewBlogPage,
  getAllBlogs,
  getDetailsOfSingleBlog,
  editBlogPage,
} from "../../../controllers/blogControllers.js";

export const GET = (router) => {
  /**
   * FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE
   * @param REQUEST_METHOD: GET - TYPE OF REQUEST
   */
  router.get("/", getAllBlogs);

  /**
   * FETCH DETAILS OF A SINGLE BLOG FROM THE MONGODB DATABASE
   * @param REQUEST_METHOD: GET - TYPE OF REQUEST
   */
  router.get("/create", createNewBlogPage);

  /**
   * GO TO THE PAGE THAT DISPLAYS THE FORM TO CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
   * @param REQUEST_METHOD: GET - TYPE OF REQUEST
   */
  router.get("/:id", getDetailsOfSingleBlog);

  /**
   * GO TO THE PAGE THAT DISPLAYS THE FORM TO EDIT AN EXISTING BLOG DOCUMENT FROM THE MONGODB DATABASE
   * @param REQUEST_METHOD: GET - TYPE OF REQUEST
   */
  router.get("/edit/:id", editBlogPage);
};
