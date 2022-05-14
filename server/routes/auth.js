const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/session", authController.login_post);

router.post("/", authController.signup_post);

module.exports = router;
