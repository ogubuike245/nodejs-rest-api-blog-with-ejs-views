const User = require("../models/user.model");
const app = require("../app");
const request = require("supertest");

const authRouteTests = {
  beforeEach: async () => {
    // Drop the users collection before each test
    await User.deleteMany({});
  },

  signupPageTest: async () => {
    const response = await request(app).get("/api/v1/auth/signup");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Signup");
  },

  createNewUserTest: async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "test123",
      firstname: "John",
      lastname: "Doe",
      nickname: "johndoe",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Registration successful!");
  },

  existingEmailTest: async () => {
    // Create a user with the same email before running the test
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
      firstname: "Jane",
      lastname: "Doe",
      nickname: "janedoe",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that email address already exists. Please try again with a different email address or log in to your existing account."
    );
  },

  existingNicknameTest: async () => {
    // Create a user with the same nickname before running the test
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
      firstname: "Jane",
      lastname: "Doe",
      nickname: "johndoe",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that nickname already exists. Please try again with a different nickname."
    );
  },
};

module.exports = authRouteTests;
