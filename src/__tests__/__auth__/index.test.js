const app = require("../../app");
const request = require("supertest");
const signupRouteTests = require("./signup.test");
const loginRouteTests = require("./login.test");
const User = require("../../models/user.model");

// Run the SIGNUP route tests

describe("User Registration", () => {
  beforeEach(async () => {
    // Drop the users collection before each test
    await User.deleteMany({});
  });

  it("should render the signup page", async () => {
    signupRouteTests.signupPageTest;
  });

  it("should create a new user", async () => {
    signupRouteTests.createNewUserTest;
  });

  it("should not allow registration with an existing email", async () => {
    signupRouteTests.existingEmailTest;
  });

  it("should not allow registration with an existing nickname", async () => {
    signupRouteTests.existingNicknameTest;
  });
});

// Run the LOGIN route tests

describe("User Authentication / Login", () => {
  beforeEach(async () => {
    // Drop the users collection before each test
    await User.deleteMany({});
  });

  it("should render the login page", async () => {
    loginRouteTests.loginPageTest;
  });

  it("should create a new user and attempt to log them in", async () => {
    loginRouteTests.loginUserTest;
  });

  it("should not allow login with an invalid email", async () => {
    loginRouteTests.invalidEmailTest;
  });

  it("should not allow registration with an invalid password ", async () => {
    loginRouteTests.invalidPasswordTest;
  });
});

// Run the error handling middleware tests

describe("Test the error handling middleware", () => {
  it("should render the 404 page for unknown routes", async () => {
    const res = await request(app).get("/api/v1/notfound");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain("<html");
    expect(res.text).toContain("<head");
    expect(res.text).toContain("<body");
  });
});
