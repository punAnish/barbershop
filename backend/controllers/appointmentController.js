// const Appointment = require("../models/appointmentModel");
// const User = require("../models/userModel");
// const mongoose = require("mongoose");

// // Create a new appointment
// const createAppointment = async (req, res) => {
//   try {
//     console.log(req.user);
//     const { customerName, serviceType, date, timeSlot, notes } = req.body;
//     const userId = req.user._id;

//     const appointment = new Appointment({
//       customerName,
//       serviceType,
//       date,
//       timeSlot,
//       notes,
//       user: userId,
//     });

//     const savedAppointment = await appointment.save();

//     res.status(201).json(savedAppointment);
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

// // Get all appointments for a user
// const getAppointments = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const appointments = await Appointment.find({ user: userId });

//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Get an appointment by ID
// const getAppointment = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     console.log("Appointment ID:", _id);

//     const appointment = await Appointment.findById(_id);

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     res.status(200).json(appointment);
//   } catch (error) {
//     console.error("Error fetching appointment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update an appointment by ID
// const updateAppointment = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { customerName, serviceType, date, timeSlot, notes } = req.body;
//     const userId = req.user._id;
//     console.log("User ID from token:", userId);

//     const appointment = await Appointment.findById(_id);

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Convert the appointment.user to ObjectId for comparison
//     const appointmentUserId = mongoose.Types.ObjectId(appointment.user);

//     if (appointmentUserId.toString() !== userId.toString()) {
//       console.log("Permission denied for User ID:", userId);
//       console.log("User ID from appointment (original):", appointment.user);
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     appointment.customerName = customerName;
//     appointment.serviceType = serviceType;
//     appointment.date = date;
//     appointment.timeSlot = timeSlot;
//     appointment.notes = notes;

//     const updatedAppointment = await appointment.save();

//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     console.error("Error updating appointment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Delete an appointment by ID
// const deleteAppointment = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const userId = req.user._id;
//     // Check if userId and appointment.user are both valid ObjectId types
//     if (!(userId instanceof mongoose.Types.ObjectId)) {
//       console.log("Invalid ObjectId type for userId");
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     const appointment = await Appointment.findById(_id);

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Convert the appointment.user to ObjectId for comparison
//     const appointmentUserId = mongoose.Types.ObjectId(appointment.user);

//     if (appointmentUserId.toString() !== userId.toString()) {
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     await appointment.remove();

//     res.status(204).send();
//   } catch (error) {
//     console.error("Error deleting appointment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   createAppointment,
//   getAppointments,
//   getAppointment,
//   updateAppointment,
//   deleteAppointment,
// };

const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    console.log(req.user);
    const { customerName, serviceType, date, timeSlot, notes } = req.body;
    const userId = req.user._id;

    const appointment = new Appointment({
      customerName,
      serviceType,
      date,
      timeSlot,
      notes,
      user: userId,
    });

    const savedAppointment = await appointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all appointments for a user
const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ user: userId });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get an appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Appointment ID:", _id);

    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an appointment by ID
const updateAppointment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { customerName, serviceType, date, timeSlot, notes } = req.body;
    const userId = req.user._id;
    console.log("User ID from token:", userId);

    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Convert the appointment.user to ObjectId for comparison
    const appointmentUserId = mongoose.Types.ObjectId(appointment.user);

    if (appointmentUserId.toString() !== userId.toString()) {
      console.log("Permission denied for User ID:", userId);
      console.log("User ID from appointment (original):", appointment.user);
      return res.status(403).json({ message: "Permission denied" });
    }

    appointment.customerName = customerName;
    appointment.serviceType = serviceType;
    appointment.date = date;
    appointment.timeSlot = timeSlot;
    appointment.notes = notes;

    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;

    // Check if _id is provided and valid
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid appointment ID" });
    }

    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Convert the appointment.user to ObjectId for comparison
    const appointmentUserId = mongoose.Types.ObjectId(appointment.user);

    if (appointmentUserId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Log a message when the appointment is deleted
    console.log(`Appointment deleted: ${_id}`);
    await appointment.remove();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
