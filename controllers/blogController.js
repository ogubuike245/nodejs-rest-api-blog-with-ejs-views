import moment from "moment";
import Blog from "../models/blogModel.js";

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
    .catch((err) => {
      console.log(err);
    });
};

export const getDetailsOfSingleBlog = (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result) => {
      response.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      response.render("404", { title: "Blog not found" });
    });
};

export const createNewBlogPage = (request, response) => {
  response.render("create", { title: "Create a new blog" });
};

export const createNewBlogPost = (request, response) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteBlog = (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({ redirect: "/blogs" });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const editBlog = (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndUpdate(id)
    .then((result) => {
      response.json({ redirect: "/blogs" });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// const blog_create_post = (request, response) => {
//   const blog = new Blog(request.body);
//   blog
//     .save()
//     .then((result) => {
//       response.redirect("/blogs");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// export default = {
//   blog_index,
//   blog_details,
//   blog_create_get,
//   blog_create_post,
//   blog_delete,
// };
