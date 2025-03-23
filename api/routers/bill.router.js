const express = require("express");
const router = express.Router();

const controller = require("../controllers/bill.controller");

router.get("/getList", controller.getList);

router.get("/getById/:id", controller.getById);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.patch("/delete/:id", controller.delete);

router.patch("/restore/:id", controller.restore);

module.exports = router;
