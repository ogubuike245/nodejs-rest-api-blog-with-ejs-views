const request = require("supertest");
const app = require("../app");
const User = require("../models/user.model");

describe("Test the auth route", () => {
  beforeEach(async () => {
    // Drop the users collection before each test
    await User.deleteMany({});
  });

  it("should return status code 200 and render the signup page", async () => {
    const response = await request(app).get("/api/v1/auth/signup");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Signup");
  });

  it("should return status code 201 and a success message with a new user", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Registration successful!");
  });

  it("should return status code 400 and an error message with an existing user", async () => {
    // Create a user with nickname "johndoe" before running the test
    await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });

    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that email address already exists. Please try again with a different email address or log in to your existing account."
    );
  });

  it("should return status code 400 and an error message with an existing nickname", async () => {
    // Create a user with nickname "johndoe" before running the test
    await request(app).post("/api/v1/auth/signup").send({
      email: "test1@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });

    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test2@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that nickname already exists. Please try again with a different nickname."
    );
  });
});

describe("Test the error handling middleware", () => {
  // test the 404 error route
  it("should return status code 404 and render the 404 page", async () => {
    const res = await request(app).get("/api/v1/notfound");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toContain("404");
  });
});
