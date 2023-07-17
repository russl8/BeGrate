const asyncHandler = require('express-async-handler')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


exports.signupPage = asyncHandler(async (req, res, next) => {
  res.json({ hi: "hi" })
})

exports.signupSubmit = [
  body("username", "Username should be at least six characters!").trim().isLength({ min: 6 }).escape(),
  body("password", "Password should be at least six characters!").trim().isLength({ min: 6 }).escape(),
  body("email", "Invalid email! ").trim().isEmail().escape(),

  asyncHandler(async (req, res, next) => {


    try {
      let errs = validationResult(req)
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        errs.errors.push({ msg: "Username already exists. Please try using another username." })
        console.log(errs.errors)
      }

      if (errs.errors.length === 0) {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
        });

        await newUser.save();
        res.send("User Created");
      } else {
        res.json({ errors: errs })

      }

    } catch (err) {
      console.error(err);
    }
  })]




// exports.signupSubmit = asyncHandler(async (req, res, next) => {
    // //create a mock user
    // const userDetails = {
    //     username: "oliispoop",
    //     email: "o@gmail.com",
    //     password: "password"
    // }
    // let passwordError = false;
    // const errors = validationResult(req)
    // if (req.body.password !== req.body.confirmpassword) {
    // 	passwordError = true
    // }

    // let userDetails = {
    // 	username: req.body.username,
    // 	password: req.body.password,
    // 	confirmpassword: req.body.confirmpassword
    // }

    // await User.findOne({ username: req.body.username }, async (err, doc) => {
    //     if (err) { };
    //     if (doc) res.send("User already exists")
    //     if (!doc) {
    //         bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    //             // if err, do something
    //             // otherwise, store hashedPassword in DB
    //             if (!err) {


    //                 const newUser = new User({
    //                     username: req.body.username,
    //                     password: hashedPassword,
    //                     email: req.body.email,

    //                 })
    //                 // await newUser.save();
    //                 res.send("User Created")

    //             }
    //         })
    //     }

    // })

    // if (!errors.isEmpty()) {
    //     console.log("error")

    // } else {
    //     bcrypt.hash(userDetails.password, 10, async (err, hashedPassword) => {
    //         // if err, do something
    //         // otherwise, store hashedPassword in DB
    //         if (!err) {


    //             const userHashed = new User({
    //                 username: userDetails.username,
    //                 password: hashedPassword,
    //                 email: userDetails.email
    //             });
    //             // await userHashed.save();
    //             res.json({ userHashed })

    //         }
    //     })

    // }
// })