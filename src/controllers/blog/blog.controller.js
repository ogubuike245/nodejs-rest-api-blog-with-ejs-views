const {
  getAllBlogsService,
  createBlogService,
  getSingleBlogPostService,
  editSingleBlogPagePostService,
  editSingleBlogPostService,
  deleteSingleBlogPostService,
} = require("../../services/blog/blog.service");
const { logger } = require("../../utils/logger");

const blogPostsPage = async (req, res) => {
  try {
    const result = await getAllBlogsService();
    const { posts } = result;
    res.render("blogs", { title: "Blogs", blogs: posts });
  } catch (error) {
    logger.error(error.message);
  }
};
const createBlogPostPage = async (req, res) => {
  res.render("create-blog", { title: "Create blog" });
};
const createBlogPost = async (request, res) => {
  try {
    const { title, category, snippet, content } = request.body;

    const postedBy = request.user._id;

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

  try {
    const result = await getSingleBlogPostService({ id });
    const { message, status, blog, error } = result;

    if (error) {
      return res.status(status).json({
        error,
        message,
      });
    }

    return res.status(status).render("blog", {
      title: "BLOG POST",
      post: blog,
      message,
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

const editBlogPostPage = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await editSingleBlogPagePostService({ id });
    const { message, status, blog, error } = result;

    if (error) {
      return res.status(status).json({
        error,
        message,
      });
    }

    return res.status(status).render("edit-blog", {
      title: "BLOG POST",
      post: blog,
      message,
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};
const editBlogPost = async (request, res) => {
  try {
    const { id } = request.params;
    const { title, category, snippet, content } = request.body;

    const result = await editSingleBlogPostService({
      id,
      title,
      category,
      snippet,
      content,
    });

    const { status, message, blog, success, error } = result;

    if (error) {
      return res.status(status).json({
        error,
        message,
      });
    }

    return res.status(status).json({
      post: blog,
      message,
      success,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

const deleteBlogPost = async (request, res) => {
  try {
    const { id } = request.params;
    console.log(id);

    const result = await deleteSingleBlogPostService({ id });

    const { status, message, success, error } = result;

    if (error) {
      return res.status(status).json({
        error,
        message,
      });
    }

    return res.redirect("/");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error deleting blog post" });
  }
};

module.exports = {
  blogPostsPage,
  createBlogPostPage,
  createBlogPost,
  editBlogPostPage,
  editBlogPost,
  getSingleBlogPostPage,
  deleteBlogPost,
};
