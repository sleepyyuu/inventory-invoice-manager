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
      const accessToken = jwt.sign({ username: dbUser.username }, process.env.JWT_TOKEN, { expiresIn: "10s" });
      const newRefreshToken = jwt.sign({ username: dbUser.username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
      });

      const newRefreshTokenArray = !cookies?.jwt
        ? dbUser.refreshToken
        : dbUser.refreshToken.filter((token) => token !== cookies.jwt);
      if (cookies.jwt) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
      }
      dbUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await dbUser.save();
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({ username: dbUser.username, accessToken });
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

exports.logout_get = async function (req, res, next) {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    //no jwt in cookies
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec();
  if (user == null) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  const newRefreshTokenArray = user.refreshToken.filter((token) => {
    return token !== refreshToken;
  });
  user.refreshToken = newRefreshTokenArray;
  await user.save();
  res.clearCookie("jwt", { httpOnly: true });
  return res.sendStatus(204);
};