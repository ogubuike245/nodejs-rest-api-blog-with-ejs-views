const Blog = require("../models/blog.model");

exports.homePageService = async function () {
  try {
    const posts = await Blog.find({}).populate("postedBy");

    return {
      success: true,
      message: "Blog Posts received",
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
