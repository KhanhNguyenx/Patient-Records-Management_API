const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob : Date,
    gender : String,
    phone : String,
    email: String,
    address: String,
    avatar: String,
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

const Patient = mongoose.model("Patient", patientSchema, "patients");

module.exports = Patient;
