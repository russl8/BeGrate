//dotenv
require("dotenv").config();

//express boilerplate and requires
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const session = require("express-session")
const cors = require('cors');
const passport = require("passport");
// --------------------mongoose setup & connection----------------------------------------------

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.mongoURL
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
}
// --------------------------view engine setup----------------------------------------


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ---------------------------------middleware---------------------------------
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: "secretkey",
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser("secretkey"));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// -----------------------routers-------------------------------------------

app.use('/', indexRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
