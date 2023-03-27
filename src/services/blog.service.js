const Blog = require("../models/blog.model");

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
