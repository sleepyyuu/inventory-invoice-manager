var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const buyerRouter = require("./routes/buyer");
const productPriceRouter = require("./routes/productPrice");
const invoiceRouter = require("./routes/invoice");
const authRouter = require("./routes/auth");
const refreshRouter = require("./routes/refresh");

var app = express();

//mongoose connection
require("dotenv").config();
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      }
    },
  })
);

require("./passport");
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(passport.initialize());

app.use("/api/products", passport.authenticate("jwt", { session: false }), productRouter);
app.use("/api/buyers", passport.authenticate("jwt", { session: false }), buyerRouter);
app.use("/api/productprices", passport.authenticate("jwt", { session: false }), productPriceRouter);
app.use("/api/invoices", passport.authenticate("jwt", { session: false }), invoiceRouter);
app.use("/api/users", authRouter);
app.use("/api/refresh", refreshRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;