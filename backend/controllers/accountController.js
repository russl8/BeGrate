const asyncHandler = require('express-async-handler')
const User = require("../models/user")
const Post = require("../models/post")
const util = require('util');
const jwt = require("jsonwebtoken")

exports.accountPage = asyncHandler(async (req, res, next) => {
    try {

        //get user of account
        const accountid = req.params.accountid;
        const accountUser = await User.findOne({ _id: accountid });

        const userIsAccountHolder = await isUserAccountHolder(req.token, accountUser.username)

        // get user posts
        let userPosts = null
        if (userIsAccountHolder) {
            userPosts = await Post.find({ user: accountid }).sort({dateCreated:-1}).exec()
        } else {
            userPosts = await Post.find({ user: accountid, isPrivate: false }).sort({dateCreated:-1}).exec()

        }


        //now render the account page with info
        res.json({ user: accountUser, posts: userPosts, status: "success" })
    } catch (e) {
        res.json({ status: "fail" })
    }

})

async function isUserAccountHolder(token, accountName) {
    const verifyJwt = util.promisify(jwt.verify);

    try {
        const authData = await verifyJwt(token, "secretkey");
        const currentUser = authData.user;

        if (accountName === currentUser.username) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Handle invalid token error
        console.error('Invalid token:', error);
        return false;
    }
}