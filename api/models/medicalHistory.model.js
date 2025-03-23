const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Active", "Closed", "Referred"],
      default: "Pending"
    },
    visitDate: Date,
    symptoms: [String], 
    diagnosis: [String],
    treatment: [String],    
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

const MedicalHistory = mongoose.model(
  "MedicalHistory",
  medicalHistorySchema,
  "medicalhistories"
);

module.exports = MedicalHistory;
