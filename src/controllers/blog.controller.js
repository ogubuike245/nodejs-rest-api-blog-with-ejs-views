const {
  createBlogService,
  getAllBlogsService,
} = require("../services/blog.service");
const { logger } = require("../utils/logger");

const blogPostsPage = async (req, res) => {
  try {
    const result = await getAllBlogsService();
    const { posts } = result;
    res.render("posts", { title: "Blogs", blogs: posts });
  } catch (error) {
    logger.error(error);
    logger.error(error.message);
  }
};
const createBlogPostPage = async (req, res) => {
  res.render("create", { title: "Create blog" });
};
const createBlogPost = async (request, res) => {
  try {
    const { title, category, snippet, content } = request.body;

    const postedBy = request.body.postedBy || request.user._id;

    const result = await createBlogService({
      title,
      category,
      snippet,
      content,
      postedBy,
    });

    const { status, message, post, success } = result;

    return res.status(status).json({ message, success, post });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};
const editBlogPostPage = async (req, res) => {
  res.render("create", { title: "Create blog" });
};
const editBlogPost = async (request, res) => {
  try {
    const { title, category, snippet, content } = request.body;

    const postedBy = request.body.postedBy || request.user._id;

    const result = await createBlogService({
      title,
      category,
      snippet,
      content,
      postedBy,
    });

    const { status, message, post, success } = result;

    return res.status(status).json({ message, success, post });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

module.exports = {
  blogPostsPage,
  createBlogPost,
  createBlogPost,
  editBlogPostPage,
  editBlogPostPage,
};
