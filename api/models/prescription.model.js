const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient_id: { type: String, default: "" },
    doctor_id: { type: String, default: "" },
    status: {
      type: String,
      default: "Pending",
    },
    // Trạng thái của đơn thuốc:
    // "Pending": Đơn thuốc đang chờ duyệt.
    // "Approved": Đơn thuốc đã được duyệt.
    // "Rejected": Đơn thuốc bị từ chối.
    // "Completed": Đơn thuốc đã hoàn thành/được sử dụng.
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String },
      },
    ],
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

const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema,
  "prescriptions"
);

module.exports = Prescription;
