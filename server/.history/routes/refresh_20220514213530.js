const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

router.get("/", refreshTokenController.refresh_token_get);

module.exports = router;
