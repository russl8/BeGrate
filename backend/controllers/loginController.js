const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* login page. */
exports.loginPage = asyncHandler(async (req, res, next) => {
  // Render a form
  res.json({
    msg: 'Remember to render a form!',
  });
});

exports.loginSubmit = asyncHandler(async (req, res, next) => {
  console.log("hi")
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists");
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully authenticated")
        console.log(req.user)

      })
    }

  })(req, res, next);
});


//PASSPORT -------------
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Passwords match! Log the user in
          return done(null, user);
        } else {
          // Passwords do not match!
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

//used in background by passport
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
