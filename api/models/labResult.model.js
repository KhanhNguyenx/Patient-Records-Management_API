const mongoose = require("mongoose");

const labResultSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    status: {
      type: String,
      default: "Pending",
    }, //Pending, In Progress, Completed, Cancelled, Failed
    testType: String,
    testDate: Date,
    results: String,
    notes: String,
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

const LabResult = mongoose.model("LabResult", labResultSchema, "labresults");

module.exports = LabResult;
