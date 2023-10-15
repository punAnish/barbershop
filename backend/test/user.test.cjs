const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const User = require("../models/userModel");
const mongoose = require("mongoose");

describe("Users API", () => {
  let token;

  beforeEach(async function () {
    this.timeout(10000);
    // Set up a common context before each test
    await User.deleteMany({});
    const result = await api.post("/api/users").send({
      name: "babina",
      email: "babina@yahoo.com",
      password: "abcABC123!",
      passwordAgain: "abcABC123!",
    });
    token = result.body.token;
  });

  describe("User Registration", () => {
    it("should register a new user", async () => {
      const response = await api
        .post("/api/users")
        .send({
          name: "babina",
          email: "babina@yahoo.com",
          password: "abcABC123!",
          passwordAgain: "abcABC123!",
        })
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const registeredUser = await User.findOne({ email: "babina@yahoo.com" });
      expect(registeredUser).to.exist;
    });

    it("should not register with invalid email", async () => {
      await api
        .post("/api/users")
        .send({
          name: "invalid email",
          email: "invalid-email",
          password: "abcABC123!",
        })
        .expect(400);
    });

    it("should not register with invalid password", async () => {
      await api
        .post("/api/users")
        .send({
          name: "invalid password",
          email: "valid@yahoo.com",
          password: "weak",
        })
        .expect(400);
    });

    it("should not register if passwords do not match", async () => {
      await api
        .post("/api/users")
        .send({
          name: "passwords don't match",
          email: "match@yahoo.com",
          password: "password1",
          passwordAgain: "password2",
        })
        .expect(400);
    });
  });

  describe("User Login", () => {
    it("should login an existing user", async () => {
      const response = await api
        .post("/api/users/login")
        .send({
          email: "babina@yahoo.com",
          password: "abcABC123!",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.token).to.exist;
    });

    it("should not login with incorrect password", async () => {
      await api
        .post("/api/users/login")
        .send({
          email: "babina@yahoo.com",
          password: "incorrectpassword",
        })
        .expect(400);
    });
  });

  after(() => {
    mongoose.connection.close();
  });
});
