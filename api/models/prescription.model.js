const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    status: {
      type: String,
      default: "Pending",
    },
    medication: String,
    dosage: String,
    startDate: Date,
    endDate: Date,
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

const Prescription = mongoose.model("Prescription", prescriptionSchema, "prescriptions");

module.exports = Prescription;
