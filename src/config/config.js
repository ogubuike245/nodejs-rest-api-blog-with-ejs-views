const mongoose = require("mongoose");
const { MONGODB_URI, API_PORT } = process.env;

export const connectToDatabaseAndStartServer = (app) => {
  mongoose.set("strictQuery", false);
  mongoose.connection.on("connected", () => {
    console.info(`CONNECTED TO DATABASE`);

    // Start the application after database connection is established

    app.listen(API_PORT || 5000, (response) => {
      console.info(`Server is running on PORT :${API_PORT}`);
    });
  });

  mongoose.connection.on("error", (error) => {
    console.error(error);
  });

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
