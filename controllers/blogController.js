import Blog from "../models/blogModel.js";

export const blog_index = (request, response) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      response.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const blog_details = (request, response) => {
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

export const blog_create_get = (request, response) => {
  response.render("create", { title: "Create a new blog" });
};

export const blog_create_post = (request, response) => {
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
export const blog_delete = (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({ redirect: "/blogs" });
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
