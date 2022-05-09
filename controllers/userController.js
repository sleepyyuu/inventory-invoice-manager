const User = require("../models/user");
const async = require("async");

exports.user_register_post = function (req, res, next) {
  async.parallel(
    {
      username: User.find({ username: req.body.username }),
      email: User.find({ email: req.body.email }),
    },
    function (err, results) {
      if (results.username.length > 0) {
        return res.status(409).send("Username already in use");
      }
      if (results.email.length > 0) {
        return res.status(409).send("Email already in use");
      }
      let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.status(200).send("Success");
      });
    }
  );
};

exports.user_login_post = function (req, res, next) {};
