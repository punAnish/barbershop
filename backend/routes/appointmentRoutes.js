const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API endpoints for managing appointments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         customerName:
 *           type: string
 *         serviceType:
 *           type: string
 *         date:
 *           type: date
 *
 *         timeSlot:
 *           type: string
 *         notes:
 *           type: string
 *         required:
 *          - customerName
 *          - serviceType
 *          - date
 *          - timeSlot
 *          - notes
 *         example:
 *          customerName: hafiz
 *          serviceType: haircut
 *          date: "2023-10-16T12:00:00.000Z"
 *          timeSlot: 12:00
 *          notes: i need short haircut
 */

// GET all appointments
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Returns an array of all appointments
 *       500:
 *         description: Internal server error
 */
router.get("/", protect, getAppointments);

// GET a single appointment
/**
 * @swagger
 * /appointments/{_id}:
 *   get:
 *     summary: Get a single appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the appointment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a single appointment
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
router.get("/:_id", protect, getAppointment);

// POST a new appointment
/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       description: New appointment object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/", protect, createAppointment);

// UPDATE a appointment
/**
 * @swagger
 * /appointments/{_id}:
 *   patch:
 *     summary: Update a appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the appointment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated appointment object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */

router.patch("/:_id", protect, updateAppointment);

// DELETE a appointment
/**
 * @swagger
 * /appointments/{_id}:
 *   delete:
 *     summary: Delete a appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the appointment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:_id", protect, deleteAppointment);

module.exports = router;
