const application = require("./app");
const { logger } = require("./utils/logger");

const { API_PORT } = process.env;

//LISTEN FOR REQUESTS
application.listen(API_PORT || 5000, () => {
  logger.info(` LISTENING ON PORT ${API_PORT} `);
});
