const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");

describe("Appointment API", () => {
  let token = null; // Store the user token for authorization

  // Before running the tests, create a user and obtain a valid token
  beforeEach(async function () {
    this.timeout(10000);
    await User.deleteMany({});
    await Appointment.deleteMany({});

    // Generate a unique email for each test run
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    const userCredentials = {
      name: "babina",
      email: uniqueEmail,
      password: "abcABC123!",
      passwordAgain: "abcABC123!",
    };

    const response = await api
      .post("/api/users")
      .send(userCredentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    token = response.body.token;
  });

  describe("Creating Appointments", () => {
    it("should create a new appointment", async () => {
      const appointmentData = {
        customerName: "Alice",
        serviceType: "Haircut",
        date: "2023-10-15",
        timeSlot: "10:00 AM",
        notes: "New haircut appointment",
      };

      const response = await api
        .post("/api/appointments")
        .set("Authorization", "bearer " + token)
        .send(appointmentData)
        .expect(201) // Expecting a successful appointment creation response
        .expect("Content-Type", /application\/json/);

      // Check the response body or database to verify the appointment is created
      const createdAppointment = await Appointment.findById(response.body._id);
      expect(createdAppointment).to.exist;
    });
  });

  describe("Updating Appointments", () => {
    it("should update an existing appointment", async () => {
      // Create a new appointment
      const appointmentData = {
        customerName: "Eve",
        serviceType: "Massage",
        date: "2023-10-25",
        timeSlot: "3:00 PM",
        notes: "Massage appointment",
      };

      const createResponse = await api
        .post("/api/appointments")
        .set("Authorization", "bearer " + token)
        .send(appointmentData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const appointmentId = createResponse.body._id;

      // Update the appointment
      const updatedData = {
        customerName: "Eve Updated",
        serviceType: "Manicure",
        date: "2023-10-26",
        timeSlot: "4:00 PM",
        notes: "Updated appointment",
      };

      const updateResponse = await api
        .put("/api/appointments/" + appointmentId)
        .set("Authorization", "bearer " + token)
        .send(updatedData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // Check the response and database to verify the appointment is updated
      expect(updateResponse.body.customerName).to.equal(
        updatedData.customerName
      );

      // Verify the changes are reflected in the database
      const updatedAppointment = await Appointment.findById(appointmentId);
      expect(updatedAppointment.customerName).to.equal(
        updatedData.customerName
      );
    });
  });

  describe("Deleting Appointments", () => {
    it("should delete an existing appointment", async () => {
      const appointmentData = {
        customerName: "Bob",
        serviceType: "Shave",
        date: "2023-10-20",
        timeSlot: "2:30 PM",
        notes: "Shave appointment",
      };

      const createResponse = await api
        .post("/api/appointments")
        .set("Authorization", "bearer " + token)
        .send(appointmentData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const appointmentId = createResponse.body._id;

      const deleteResponse = await api
        .delete("/api/appointments/" + appointmentId)
        .set("Authorization", "bearer " + token)
        .expect(204); // Expecting a successful appointment deletion response

      // Verify that the appointment is deleted
      const deletedAppointment = await Appointment.findById(appointmentId);
      expect(deletedAppointment).to.be.null;
    });
  });

  // ...

  describe("Retrieving Appointments", () => {
    beforeEach(async function () {
      // Create a user for test data
      const userData = await User.create({
        name: "babina",
        email: "babina@yahoo.com",
        password: "abcABC123!",
        passwordAgain: "abcABC123!",
      });

      // Create the test user
      const user = await User.create(userData);

      // Add test appointments to the database before each test
      await Appointment.create([
        {
          user: user._id,
          customerName: "Alice",
          serviceType: "Haircut",
          date: "2023-10-15",
          timeSlot: "10:00 AM",
          notes: "New haircut appointment",
        },
        {
          user: user._id,
          customerName: "Eve",
          serviceType: "Massage",
          date: "2023-10-20",
          timeSlot: "3:00 PM",
          notes: "Massage appointment",
        },
        // Add more test appointments as needed
      ]);
    });

    it("should retrieve a list of appointments", async () => {
      const response = await api
        .get("/api/appointments")
        .set("Authorization", "bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // Log the actual response for debugging
      console.log("Actual Response:", response.body);

      // Check the response body to verify that it contains appointment data
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  // Add more describe blocks for other appointment-related test cases
  // (e.g., Additional Updates, Retrieving Single Appointment, etc.)

  after(() => {
    mongoose.connection.close();
  });
});
