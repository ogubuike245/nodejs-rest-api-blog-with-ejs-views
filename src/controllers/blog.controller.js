const Blog = require("../models/blog.model");
const { logger } = require("../utils/logger");

const blogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("postedBy");
    res.render("posts", { title: "Blogs", blogs });
  } catch (error) {
    logger.error(error);
    logger.error(error.message);
  }
};
const createBlogPost = async (req, res) => {
  try {
    const { title, category, snippet, description, postedBy } = req.body;
    const blog = await Blog.create({
      title,
      category,
      snippet,
      description,
      postedBy,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

module.exports = {
  blogPosts,
  createBlogPost,
};
