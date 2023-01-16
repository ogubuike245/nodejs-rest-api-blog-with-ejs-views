import mongoose from "mongoose";

export const connectToDatabase = async (app, config, apicache) => {
  config();
  const { PORT, MONG0_DB_URI } = process.env;

  await mongoose
    .set("strictQuery", false)
    .connect(MONG0_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) =>
      //LISTEN FOR REQUESTS
      app.listen(PORT || 5000, () => {
        console.log(
          ` LISTENING ON PORT ${PORT} &`,
          "CONNECTED TO MONGODB DATABASE WITH THE FOLLOWING MODELS :",
          result.models
        );
      })
    )
    .catch((err) => console.log(err));
};
