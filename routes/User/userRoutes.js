import express from "express";

// FILE IMPORTS
import { GET } from "./GET/index.js";
// import { POST } from "./POST/index.js";
// import { DELETE } from "./DELETE/index.js";

const router = express.Router();

GET(router);
// POST(router);
// DELETE(router);

export default router;
