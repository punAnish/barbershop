const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

// Route for getting appointments (GET /api/appointments)
router.get("/", protect, getAppointments);

// Route for getting single appointment (GET /api/appointments/:id)
router.get("/:_id", protect, getAppointment);

// Route for creating a new appointment (POST /api/appointments)
router.post("/", protect, createAppointment);

// Route for updating a appointment by ID (PUT /api/appointments/:id)
router.put("/:_id", protect, updateAppointment);

// Route for deleting a appointment by ID (DELETE /api/appointments/:id)
router.delete("/:_id", protect, deleteAppointment);

module.exports = router;
