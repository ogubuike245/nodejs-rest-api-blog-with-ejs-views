const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

const { MONGO_DB_URI } = process.env;

exports.connectToDatabase = function (app) {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`connected to database`.toUpperCase());
  } catch (e) {
    logger.error(e);
  }
};
