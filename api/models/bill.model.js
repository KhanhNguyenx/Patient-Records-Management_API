const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    prescription_id: { type: String, default: "" },
    amount: Number,
    dateIssued: Date,
    status: {
      type: String,
      default: "Unpaid",
    }, // Ví dụ: "Unpaid", "Paid"
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

const Bill = mongoose.model("Bill", billSchema, "bills");

module.exports = Bill;
