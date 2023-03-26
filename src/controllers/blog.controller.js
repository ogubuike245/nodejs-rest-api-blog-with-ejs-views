const {
  createBlogService,
  getAllBlogsService,
} = require("../services/blog.service");
const { logger } = require("../utils/logger");

const blogPostsPage = async (req, res) => {
  try {
    const result = await getAllBlogsService();
    console.log(result);
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
    console.log(request.body);
    const postedBy = request.user._id;

    const blog = await createBlogService({
      title,
      category,
      snippet,
      content,
      postedBy,
    });

    res.status(201).json(blog);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating blog post" });
  }
};

module.exports = {
  blogPostsPage,
  createBlogPost,
  createBlogPostPage,
};
