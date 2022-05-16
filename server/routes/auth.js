const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/session", authController.login_post);

router.get("/logout", authController.logout_get);

router.post("/", authController.signup_post);

module.exports = router;
