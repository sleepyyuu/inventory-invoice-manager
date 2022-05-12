const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userController = require("../controllers/userController");

router.post("/session", passport.authenticate("login", { session: false }), (req, res, next) => {
  const token = jwt.sign({ _id: req.user._id, username: req.user.username }, process.env.JWT_TOKEN);
  res.json({ token });
});

router.post("/", passport.authenticate("signup", { session: false }), (req, res, next) => {
  res.json({ message: "Signup success" });
});
module.exports = router;
