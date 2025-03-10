const express = require("express");
const router = express.Router();

const controller = require("../controllers/doctor.controller");

router.get("/getList", controller.getList);

router.get("/getById/:id", controller.getById);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.patch("/delete/:id", controller.delete);

router.patch("/restored/:id", controller.restored);

module.exports = router;
