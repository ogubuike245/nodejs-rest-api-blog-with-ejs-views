const app = require("../../app");
const request = require("supertest");

const loginRouteTests = {
  loginPageTest: async () => {
    const response = await request(app).get("/api/v1/auth/login");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text\/html/);
    expect(response.text).toContain("<html");
    expect(response.text).toContain("<head");
    expect(response.text).toContain("<body");
  },

  loginUserTest: async () => {
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

    const loginAttempt = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "test123",
    });

    expect(loginAttempt.statusCode).toBe(200);
    expect(loginAttempt.body).toHaveProperty("success", true);
    expect(loginAttempt.body).toHaveProperty("message", "login Successful");
    expect(loginAttempt.body).toHaveProperty("redirect", "/");
  },
  invalidEmailTest: async () => {
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

    const loginAttempt = await request(app).post("/api/v1/auth/signup").send({
      email: "test1@test.com",
      password: "test123",
    });

    expect(loginAttempt.statusCode).toBe(404);
    expect(loginAttempt.body).toHaveProperty("error", true);
    expect(loginAttempt.body).toHaveProperty(
      "message",
      "The email address provided does not match any existing accounts. Please double-check the email address or create a new account."
    );
  },
  invalidPasswordTest: async () => {
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

    const loginAttempt = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "invalid",
    });

    expect(loginAttempt.statusCode).toBe(401);
    expect(loginAttempt.body).toHaveProperty("error", true);
    expect(loginAttempt.body).toHaveProperty(
      "message",
      "Incorrect email or password. Please make sure you have entered the correct email and password combination."
    );
  },
};

module.exports = loginRouteTests;
