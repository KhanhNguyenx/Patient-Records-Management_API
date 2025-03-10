const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob : Date,
    specialty: String,
    phone: String,
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

const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");

module.exports = Doctor;
