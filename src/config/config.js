const mongoose = require("mongoose");
const { MONGODB_URI, API_PORT } = process.env;

const connectToDatabaseAndStartServer = (app) => {
  mongoose.set("strictQuery", false);
  mongoose.connection.on("connected", function () {
    console.info("CONNECTED TO DATABASE");

    // Start the application after database connection is established

    app.listen(API_PORT || 5000, function (response) {
      console.info("Server is running on PORT :" + (API_PORT || 5000));
    });
  });

  mongoose.connection.on("error", function (error) {
    console.error(error);
  });

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectToDatabaseAndStartServer: connectToDatabaseAndStartServer,
};
