const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login_post = function (req, res, next) {
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
};

exports.signup_post = function (req, res, next) {
  passport.authenticate("signup", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    req.login(user, { sessions: false }, function (err) {
      if (err) {
        return res.status(400).json({ message: info.message });
      }
      return res.status(200).json({ message: info.message });
    });
  })(req, res, next);
};
