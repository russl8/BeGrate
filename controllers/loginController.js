const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator");
const User = require("../models/user")

/* login page. */
exports.loginPage = asyncHandler(async (req, res, next) => {
	//make a form
	res.json({
		msg: "rember to render a form!"
	})
});
exports.loginSubmit = asyncHandler(async (req, res, next) => {

	//look for someone with the given username (test: "russe")
	const testUser = await User.findOne({ username: "russe" })

	//if test user exists
	if (testUser) {
		//signing in should give token to make requests
		jwt.sign({ user: testUser }, "secretkey", {expiresIn: "30d"},(err, token) => {
			res.json({ user:testUser, token , message:"user logged in"})
		});
	} else {
		//rerender form with errors
		res.json({ "message": "log in error" })

	}



});