var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const Post = require("../models/post")
//controllers
const loginController = require("../controllers/loginController")
const signupController = require("../controllers/signupController")
const postController = require("../controllers/postController")
const postsController = require("../controllers/postsController");
const accountController = require('../controllers/accountController');
const commentController = require('../controllers/commentController');


/* home page. */
router.get('/', asyncHandler(async (req, res, next) => {
	let sortMethod = req.query.sortMethod || "Newest First";
	//get user of account
	// const accountid = req.params.accountid;
	// const accountUser = await User.findOne({ _id: accountid });

	// const userIsAccountHolder = await isUserAccountHolder(req.token, accountUser.username)
	// console.log(userIsAccountHolder)
	// get user posts
	let userPosts = null
	try {
		switch (sortMethod) {
			case ("Newest First"):
				userPosts = await Post.find({ isPrivate: false }).populate("user").sort({ dateCreated: -1 }).exec()
				break;
			case ("Oldest First"):

				userPosts = await Post.find({ isPrivate: false }).populate("user").sort({ dateCreated: 1 }).exec()

				break;
			case ("Most Liked"):
				userPosts = await Post.aggregate([
					{
						"$match": {
							"isPrivate": false
						}
					},
					{
						"$project": {
							"title": 1,
							"content": 1,
							"dateCreated": 1,
							"user": 1,
							"isPrivate": 1,
							"likes": 1,
							"numLikes": { "$size": "$likes" }
						}
					},

					{
						"$sort": { "numLikes": -1 }
					}
				]).exec();
				await Post.populate(userPosts, {path: "user"});
			}
		// console.log(userPosts)
		res.json(userPosts)
	} catch (e) {
		res.json(e)
	}
}));

router.post("/", asyncHandler(async (req, res, next) => {
	const token = req.body.token
	let isAuthenticated = false;

	//verify the token from req.body.token
	//to make sure it is valid
	jwt.verify(token, "secretkey", (err, userData) => {
		if (err) {
			// User is not signed in.
			console.log("Not signed in");
			isAuthenticated = false;
		} else {
			//user is signed in and authenticated. 
			console.log("Signed in");
			isAuthenticated = true;
			//res.json the auth status and userdata
			res.json({ isAuthenticated, token, userData })
		}
	})
}))
/* login page. */
router.get('/login', loginController.loginPage);
router.post('/login', loginController.loginSubmit);

//sign up
router.get("/sign-up", signupController.signupPage)
router.post("/sign-up", signupController.signupSubmit)
// ACCOUNT page
router.get("/account/:accountid", verifyToken2, accountController.accountPage)
router.post("/account/:accountid", verifyToken2, accountController.accountSortMethod)

// post-creator page
router.get("/posts", verifyToken, postsController.postsPage)
router.post("/posts", verifyToken, postsController.postsSubmit);

// INDIVIDUAL post page
router.get("/posts/:postid", verifyToken, postController.postPage)
router.post("/posts/:postid", verifyToken2, commentController.commentSubmit)
router.post("/posts/:postid/like", verifyToken2, postController.postLike)
router.get("/posts/:postid/like", verifyToken2, postController.getLike)


router.get("/posts/:postid/update", verifyToken, postController.postUpdateGet)
router.post("/posts/:postid/update", postController.postUpdatePost)

router.get("/posts/:postid/delete", postController.postDeleteGet)
router.post("/posts/:postid/delete", postController.postDeletePost)





//PASSPORT --------------------------------------------------------------------
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					// Passwords match! Log the user in
					return done(null, user);
				} else {
					// Passwords do not match!
					return done(null, false, { message: "Incorrect password" });
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
	};
});
//verify token

function verifyToken(req, res, next) {
	//get auth header value
	const bearerHeader = req.headers["authorization"]

	//check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		//continue
		//take the token out of the "Bearer <access_token>"
		const bearer = bearerHeader.split(" ");
		//get token 
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		//move on to the next middleware
		next();
	} else {
		//forbidden status (403)
		res.sendStatus(403);
	}
}

function verifyToken2(req, res, next) {
	//get auth header value
	const bearerHeader = req.headers["authorization"]

	//check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		//continue
		//take the token out of the "Bearer <access_token>"
		const bearer = bearerHeader.split(" ");
		//get token 
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		//move on to the next middleware
		next();
	} else {
		//forbidden status (403)
		res.json({ msg: "user not signed in" })
		next();
	}
}


module.exports = router;