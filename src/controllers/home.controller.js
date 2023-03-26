const { homePageService } = require("../services/home.service");
const { logger } = require("../utils/logger.js");

const homePage = async (req, res) => {
  try {
    const result = await homePageService();

    const { posts, status, message } = result;

    res.status(status).render("index", {
      title: "HOME",
      blogs: posts,
    });
  } catch (error) {
    logger.error(error);
    logger.error(error.message);
  }
};

module.exports = {
  homePage,
};
