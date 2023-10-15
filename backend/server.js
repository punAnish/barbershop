const path = require("path");
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.get("/", (req, res) => res.send("Hello"));

app.use(errorHandler);

module.exports = app;
