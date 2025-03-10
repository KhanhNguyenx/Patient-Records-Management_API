const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    status: {
      type: String,
      default: "Pending",
    }, // Pending Examined Canceled
    appointmentDate: Date,
    reason: String,
    createdBy: String,
    createdAt: Date,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

module.exports = Appointment;
