import mongoose from "mongoose";
const { API_PORT, MONGO_DB_URI } = process.env;

export const connectToDatabase = async (app) => {
  await mongoose
    .set("strictQuery", false)
    .connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) =>
      //LISTEN FOR REQUESTS
      app.listen(API_PORT || 5000, () => {
        console.log(` LISTENING ON PORT ${API_PORT} `);
      })
    )
    .catch((err) => console.log(err));
};
