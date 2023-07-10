const asyncHandler = require('express-async-handler')
const User = require("../models/user")
const Post = require("../models/post")

exports.accountPage = asyncHandler(async (req, res, next) => {
    //get user of account
    const accountid = req.params.accountid;
    const accountUser = await User.findOne({ _id: accountid });
    // get user posts
    const userPosts = await Post.find({ user: accountid })

    //now render the account page with info
    res.json({ user: accountUser, posts: userPosts })
})