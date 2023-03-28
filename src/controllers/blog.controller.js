const {
  createBlogService,
  getAllBlogsService,
  getSingleBlogPostService,
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
const getSingleBlogPostPage = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  try {
    const result = await getSingleBlogPostService({ id });
    const { message, status, blog, error } = result;

    if (error) {
      return res.status(status).json({
        error,
        message,
      });
    }

    return res
      .status(status)
      .render("post", { title: "BLOG POST", post: blog, message });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};
const getSingleBlogPost = async (request, res) => {
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
  createBlogPostPage,
  createBlogPost,
  editBlogPostPage,
  editBlogPost,
  getSingleBlogPostPage,
};
