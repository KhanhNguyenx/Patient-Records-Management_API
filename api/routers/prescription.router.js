const express = require("express");
const router = express.Router();

const controller = require("../controllers/prescription.controller");

router.get("/getList", controller.getList);


module.exports = router;
