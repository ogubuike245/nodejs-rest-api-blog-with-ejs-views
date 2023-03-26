const app = require("../../app");
const request = require("supertest");

const signupRouteTests = {
  signupPageTest: async () => {
    const response = await request(app).get("/api/v1/auth/signup");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text\/html/);
    expect(response.text).toContain("<html");
    expect(response.text).toContain("<head");
    expect(response.text).toContain("<body");
  },

  createNewUserTest: async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "ogubuike245@gmail.com",
      password: "123456",
      firstname: "ogubuike",
      lastname: "emejuru",
      nickname: "gubi",
      profession: "mechanical engineer",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Registration successful!");
  },

  existingEmailTest: async () => {
    // Create a user with the same email before running the test
    await request(app).post("/api/v1/auth/signup").send({
      email: "ogubuike245@gmail.com",
      password: "123456",
      firstname: "ogubuike",
      lastname: "emejuru",
      nickname: "gubi",
      profession: "mechanical engineer",
    });

    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "ogubuike245@gmail.com",
      password: "123456",
      firstname: "ogubuike",
      lastname: "emejuru",
      nickname: "gubi",
      profession: "mechanical engineer",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that email address already exists. Please try again with a different email address or log in to your existing account."
    );
  },

  existingNicknameTest: async () => {
    // Create a user with the same nickname before running the test
    await request(app).post("/api/v1/auth/signup").send({
      email: "ogubuike245@gmail.com",
      password: "123456",
      firstname: "ogubuike",
      lastname: "emejuru",
      nickname: "gubi",
      profession: "mechanical engineer",
    });

    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "ogubuike245@gmail.com",
      password: "123456",
      firstname: "ogubuike",
      lastname: "emejuru",
      nickname: "gubi",
      profession: "mechanical engineer",
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toContain(
      "A user with that nickname already exists. Please try again with a different nickname."
    );
  },
};

module.exports = signupRouteTests;
