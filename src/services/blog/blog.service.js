const Blog = require("../../models/blog/blog.model");

exports.getAllBlogsService = async function () {
  try {
    const posts = await Blog.find({}).populate("postedBy");

    return {
      success: true,
      message: "All Blogs received",
      status: 200,
      posts,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};

exports.createBlogService = async function (userData) {
  const { title, category, snippet, content, postedBy } = userData;
  try {
    const post = await Blog.create({
      title,
      category,
      snippet,
      content,
      postedBy,
    });

    return {
      success: true,
      message: "Blog Post Created",
      status: 200,
      post,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
exports.getSingleBlogPostService = async function (userData) {
  const { id } = userData;
  try {
    const blog = await Blog.findById(id).populate("postedBy");

    if (!blog) {
      return {
        error: true,
        message: "Blog Post Does not exist",
        status: 404,
      };
    }
    return {
      success: true,
      message: blog.title,
      status: 200,
      blog,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
exports.editSingleBlogPagePostService = async function (userData) {
  const { id } = userData;
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return {
        error: true,
        message: "Blog Post Does not exist",
        status: 404,
      };
    }
    return {
      success: true,
      message: blog.title,
      status: 200,
      blog,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
exports.editSingleBlogPostService = async function (blogData) {
  const { id, title, category, snippet, content } = blogData;
  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      category,
      snippet,
      content,
    });

    if (!blog) {
      return {
        error: true,
        message: "Blog Post Does not exist",
        status: 404,
      };
    }
    return {
      success: true,
      message: blog.title,
      status: 200,
      blog,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: 500,
    };
  }
};
