import mongoose from "mongoose";

export const connectToDatabase = async (app) => {
  const { API_PORT, MONG0_DB_URI } = process.env;

  await mongoose
    .set("strictQuery", false)
    .connect(MONG0_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) =>
      //LISTEN FOR REQUESTS
      app.listen(API_PORT || 5000, () => {
        console.log(
          ` LISTENING ON PORT ${API_PORT} &`,
          "CONNECTED TO MONGODB DATABASE WITH THE FOLLOWING MODELS :",
          result.models.user
        );
      })
    )
    .catch((err) => console.log(err));
};
