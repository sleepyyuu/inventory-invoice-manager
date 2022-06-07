const bcryptjs = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

passport.use(
  "signup",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user !== null) {
        return done(null, false, { message: "Username already in use." });
      }
      bcryptjs.hash(password, 10, (err, hashedPass) => {
        if (err) {
          return done(err);
        }
        let user = new User({
          username: username,
          password: hashedPass,
        });
        user.save(function (err) {
          if (err) {
            return done(err);
          }
          return done(null, user, { message: "Signup success" });
        });
      });
    });
  })
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Username not found" });
      }
      bcryptjs.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user), { message: "Login success" };
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.use(
  new JWTstrategy(
    { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken, secretOrKey: process.env.JWT_TOKEN },
    (token, done) => {
      console.log("test");
      if (err) {
        return done(err);
      }
      return done(null, token.username);
    }
  )
);
