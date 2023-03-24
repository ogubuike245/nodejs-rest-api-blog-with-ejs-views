const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { MONGO_DB_URI, API_PORT } = process.env;

exports.connectToDatabase = async function (app) {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //LISTEN FOR REQUESTS
    app.listen(API_PORT || 5000, () => {
      console.log(` LISTENING ON PORT ${API_PORT} and connected to database`);
    });
  } catch (e) {
    console.error(e);
  }
};
