const config = require("./config/config");
const app = require("./app");

config.connectToDatabaseAndStartServer(app);
