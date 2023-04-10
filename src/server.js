import { connectToDatabaseAndStartServer } from "./config/config";
import app from "./app";

connectToDatabaseAndStartServer(app);
