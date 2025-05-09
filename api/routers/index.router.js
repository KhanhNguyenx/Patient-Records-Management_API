const patientRoutes = require("./patient.router");
const doctorRoutes = require("./doctor.router");
const accountRoutes = require("./account.router");
const appointmentRoutes = require("./appointment.router");
const prescriptionRoutes = require("./prescription.router");
const specialtyRoutes = require("./specialty.router");
const billRoutes = require("./bill.router");
const labResultRoutes = require("./bill.router");
const medicalHistoryRoutes = require("./medicalHistory.router");
const authMiddleware = require("../middlewares/auth.middleware");
module.exports = (app) => {
  const version = "/api";

  app.use(version + "/account", accountRoutes);

  app.use(version + "/patient", patientRoutes);

  app.use(version + "/doctor", doctorRoutes);

  app.use(version + "/appointment" , appointmentRoutes);

  app.use(version + "/prescription", prescriptionRoutes);

  app.use(version + "/specialty", specialtyRoutes);

  app.use(version + "/bill", billRoutes);

  app.use(version + "/labresult", labResultRoutes);

  app.use(version + "/medicalhistory", medicalHistoryRoutes);

};
