import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { PORT, MONG0_DB_URL } = process.env;

export const connectToDatabase = async (app) => {
  await mongoose
    .set("strictQuery", false)
    .connect(MONG0_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) =>
      //LISTEN FOR REQUESTS
      app.listen(PORT || 5000, () => {
        console.log(` LISTENING ON PORT ${PORT}`, result.models);
      })
    )
    .catch((err) => console.log(err));
};
