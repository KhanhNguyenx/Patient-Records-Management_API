const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    createdBy: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Specialty = mongoose.model("Specialty", specialtySchema, "specialties");

module.exports = Specialty;
