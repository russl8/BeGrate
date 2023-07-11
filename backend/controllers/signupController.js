const asyncHandler = require('express-async-handler')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


exports.signupPage = asyncHandler(async (req, res, next) => {
    res.json({hi:"hi"})
})
exports.signupSubmit = asyncHandler(async (req, res, next) => {
    //create a mock user
    const userDetails = {
        username: "oliispoop",
        email: "o@gmail.com",
        password: "password"
    }
    let passwordError = false;
    const errors = validationResult(req)
    // if (req.body.password !== req.body.confirmpassword) {
    // 	passwordError = true
    // }

    // let userDetails = {
    // 	username: req.body.username,
    // 	password: req.body.password,
    // 	confirmpassword: req.body.confirmpassword
    // }

    if (!errors.isEmpty()) {
        console.log("error")

    } else {
        bcrypt.hash(userDetails.password, 10, async (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword in DB
            if (!err) {


                const userHashed = new User({
                    username: userDetails.username,
                    password: hashedPassword,
                    email: userDetails.email
                });
                // await userHashed.save();
                res.json({userHashed})

            }
        })

    }
})