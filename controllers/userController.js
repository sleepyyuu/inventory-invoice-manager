const User = require("../models/user");
const async = require("async");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

exports.user_register_post = function (req, res, next) {
  async.parallel(
    {
      username: User.find({ username: req.body.username }),
      email: User.find({ email: req.body.email }),
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.username.length > 0) {
        return res.status(409).send("Username already in use");
      }
      if (results.email.length > 0) {
        return res.status(409).send("Email already in use");
      }
      bcryptjs.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
          return next(err);
        }
        let user = new User({
          username: req.body.username,
          password: hashedPass,
          email: req.body.email,
        });
        user.save(function (err) {
          if (err) {
            return next(err);
          }
          res.status(200).send("Success");
        });
      });
    }
  );
};

exports.user_login_post = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_TOKEN);
    res.header("auth-token", token).send(token);
  });
};
