const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const controller = require("../controllers/account.controller");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/change-password",authMiddleware.requireAuth, controller.changePassword);

module.exports = router;
