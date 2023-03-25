const app = require("../app");
const request = require("supertest");
const authRouteTests = require("./signup.test");

// Run the auth route tests
describe("Test the auth route", () => {
  // Run the beforeEach function from the authRoute.test.js file
  beforeEach(authRouteTests.beforeEach);

  // Run all the tests from the authRoute.test.js file
  it("should render the signup page", authRouteTests.signupPageTest);
  it("should create a new user", authRouteTests.createNewUserTest);
  it(
    "should return an error for existing email",
    authRouteTests.existingEmailTest
  );
  it(
    "should return an error for existing nickname",
    authRouteTests.existingNicknameTest
  );
});

// Run the error handling middleware tests
describe("Test the error handling middleware", () => {
  // Test the 404 error route
  it("should return status code 404 and render the 404 page", async () => {
    const res = await request(app).get("/api/v1/notfound");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain("404");
  });
});
