import { userSignup, userLogin } from "../../../controllers/userControllers.js";

export const POST = (router) => {
  /**
   *
   * @param {REQUEST_METHOD}: POST - TYPE OF REQUEST
   */

  router.post("/signup", userSignup);
  router.post("/login", userLogin);
};
