import mongoose from "mongoose";
import { config } from "./config.js";
const { API_PORT, MONG0_DB_URI } = config;

export const connectToDatabase = async (app) => {
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
          ` LISTENING ON PORT ${API_PORT} `

          // result.models.user
        );
      })
    )
    .catch((err) => console.log(err));
};
