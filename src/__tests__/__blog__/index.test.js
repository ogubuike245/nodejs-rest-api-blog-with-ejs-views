const app = require("../../app");
const request = require("supertest");
const User = require("../../models/user.model");

// Run the SIGNUP route tests

describe("Blog Endpoints", () => {
  beforeEach(async () => {
    // Drop the users collection before each test
    await User.deleteMany({});
  });

  it("should render the blog page", async () => {
    signupRouteTests.signupPageTest;
  });
});
