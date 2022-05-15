const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login_post = function (req, res, next) {
  passport.authenticate("login", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    req.login(user, { sessions: false }, async function (err) {
      if (err) {
        return res.status(400).json({ message: info.message });
      }
      const dbUser = await User.findOne({ username: user.username }).exec();
      const cookies = req.cookies;
      const accessToken = jwt.sign({ username: dbUser.username }, process.env.JWT_TOKEN, { expiresIn: "10m" });
      const newRefreshToken = jwt.sign({ username: dbUser.username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
      });

      const newRefreshTokenArray = !cookies?.jwt
        ? dbUser.refreshToken
        : dbUser.refreshToken.filter((token) => token !== cookies.jwt);
      if (cookies.jwt) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: true });
      }
      dbUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await dbUser.save();
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({ accessToken });
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
