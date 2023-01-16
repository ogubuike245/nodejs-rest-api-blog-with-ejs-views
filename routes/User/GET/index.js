import {
  signupPage,
  loginPage,
  userLogout,
} from "../../../controllers/userControllers.js";

export const GET = (router) => {
  /**
   *
   * @param {REQUEST_METHOD}: GET - TYPE OF REQUEST
   */
  router.get("/signup", signupPage);
  router.get("/login", loginPage);
  router.get("/logout", userLogout);
};
