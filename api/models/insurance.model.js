const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    provider: String,
    policyNumber: String,
    coverageDetails: String,
    expirationDate: Date,
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

const Insurance = mongoose.model("Insurance", insuranceSchema, "insurance");

module.exports = Insurance;
