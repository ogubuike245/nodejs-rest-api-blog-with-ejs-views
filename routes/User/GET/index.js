import { getAllUsers } from "../../../controllers/userControllers.js";

export const GET = (router) => {
  //TODO: FETCH DETAILS OF BLOGS FROM THE MONGODB DATABASE
  router.get("/", getAllUsers);

  // //TODO: FETCH DETAILS OF A SINGLE BLOG FROM THE MONGODB DATABASE
  // router.get("/create", createNewBlogPage);
  // //TODO: GO TO THE PAGE THAT DISPLAYS THE FORM TO CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
  // router.get("/:id", getDetailsOfSingleBlog);
  // //TODO: GO TO THE PAGE THAT DISPLAYS THE FORM TO EDIT AN EXISTING BLOG DOCUMENT FROM THE MONGODB DATABASE
  // router.get("/edit/:id", editBlogPage);
};
