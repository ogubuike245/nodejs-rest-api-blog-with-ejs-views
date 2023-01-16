import express from "express";

// FILE IMPORTS
import { GET } from "./GET/index.js";
import { POST } from "./POST/index.js";
import { DELETE } from "./DELETE/index.js";

const router = express.Router();

/**
 * FUNCTIONS CONTAINING THE DIFFERENT ROUTE REQUEST METHODS AND CONTROLLERS
 * @param REQUEST_METHOD_FUNCTIONS
 */
GET(router);
POST(router);
DELETE(router);

export default router;
