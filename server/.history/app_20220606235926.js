var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const buyerRouter = require("./routes/buyer");
const productPriceRouter = require("./routes/productPrice");
const invoiceRouter = require("./routes/invoice");
const authRouter = require("./routes/auth");
const userInfoRouter = require("./routes/userInfo");
const refreshRouter = require("./routes/refresh");
const verifyToken = require("./middleware/verifyToken");

var app = express();
const allowedOrigins = ["http://localhost:3000", "https://cool-tarsier-b3e5ef.netlify.app"];
app.set("trust proxy", 1);

//mongoose connection
const mongoose = require("mongoose");
const { buildCheckFunction } = require("express-validator");
const { env } = require("process");
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
});
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

require("./passport");
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (userid, done) {
  done(null, userid);
});
app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);
app.use(verifyToken);
app.use("/api/user", userInfoRouter);
app.use("/api/products", productRouter);
app.use("/api/buyers", buyerRouter);
app.use("/api/productprices", productPriceRouter);
app.use("/api/invoices", invoiceRouter);

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

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});

module.exports = app;
