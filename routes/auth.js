const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/session", function (req, res, next) {
  passport.authenticate("login", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    req.login(user, { sessions: false }, function (err) {
      if (err) {
        return res.status(400).json({ message: info.message });
      }
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_TOKEN);
      return res.status(200).send({ token });
    });
  })(req, res, next);
});

router.post("/", function (req, res, next) {
  passport.authenticate("signup", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    req.login(user, { sessions: false }, function (err) {
      if (err) {
        return res.json({ message: info.message });
      }
      return res.json({ message: info.message });
    });
  })(req, res, next);
});
module.exports = router;
