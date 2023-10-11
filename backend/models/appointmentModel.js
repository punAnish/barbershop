const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    timeSlot: {
      type: String, // Depending on how you store time slots, you might want to adjust this
      required: true,
    },
    notes: {
      type: String,
      required: false, // Since notes might be optional
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
