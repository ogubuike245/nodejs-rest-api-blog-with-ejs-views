import moment from "moment";
import Blog from "../models/blogModel.js";

/**
 * FIXME:FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE
 * @param REQUEST_METHOD: GET - TYPE OF REQUEST
 */

export const getAllBlogs = (request, response) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      response.render("index", {
        blogs: result,
        title: "All blogs",
        moment: moment,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * FIXME: FETCH DETAILS OF A SINGLE BLOG FROM THE MONGODB DATABASE
 * @param REQUEST_METHOD: GET - TYPE OF REQUEST
 */
export const getDetailsOfSingleBlog = (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result) => {
      response.render("details", {
        blog: result,
        moment: moment,
        title: "Blog Details",
      });
    })
    .catch((error) => {
      response.render("404", { title: "Blog not found", error: error });
    });
};
/**
 * FIXME: GO TO THE PAGE THAT DISPLAYS THE FORM TO CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
 * @param REQUEST_METHOD: GET - TYPE OF REQUEST
 */
export const createNewBlogPage = (request, response) => {
  response.render("create", { title: "Create a new blog" });
};

/**
 * FIXME: GO TO THE PAGE THAT DISPLAYS THE FORM TO EDIT AN EXISTING BLOG DOCUMENT FROM THE MONGODB DATABASE
 * @param REQUEST_METHOD: GET - TYPE OF REQUEST
 */

export const editBlogPage = (request, response) => {
  const id = request.params.id;
  Blog.findById(id).then((result) => {
    response.render("edit", { blog: result, title: "Edit Blog" });
  });
};

/**
 * FIXME: CREATE A NEW BLOG DOCUMENT TO THE MONGODB DATABASE
 * @param REQUEST_METHOD: POST - TYPE OF REQUEST
 */
export const createNewBlogPost = async (request, response) => {
  const blog = await new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.json({
        redirect: "/api/v1/blogs",
        message: "DOCUMENT CREATED SUCESSFULLY",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * FIXME: EDIT A SINGLE BLOG POST DOCUMENT
 * @param {REQUEST_METHOD}: POST - TYPE OF REQUEST
 *
 */
export const editSingleBlogPost = async (request, response) => {
  const { id } = request.params;
  console.log(request.body);

  await Blog.findByIdAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  )
    .then((result) => {
      console.log("DOCUMENT EDITED SUCESSFULLY", result);
      response.json({
        redirect: "/api/v1/blogs",
        message: "DOCUMENT EDITED SUCESSFULLY",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * FIXME: DELETE A BLOG DOCUMENT FROM THE MONGODB DATABASE
 * @param REQUEST_METHOD: DELETE - TYPE OF REQUEST
 */

export const deleteBlog = async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({
        redirect: "/api/v1/blogs",
        message: "DOCUMENT DELETED SUCESSFULLY",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
