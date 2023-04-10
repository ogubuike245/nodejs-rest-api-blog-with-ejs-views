const app = require("./app");
const { connectToDatabaseAndStartServer } = require("./config/config");
connectToDatabaseAndStartServer(app);
