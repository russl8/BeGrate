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
            userPosts = await Post.find({ user: accountid }).sort({ dateCreated: -1 }).populate("user").exec()
        } else {
            userPosts = await Post.find({ user: accountid, isPrivate: false }).sort({ dateCreated: -1 }).populate("user").exec()

        }


        //now render the account page with info
        res.json({ user: accountUser, posts: userPosts, status: "success" })
    } catch (e) {
        res.json({ status: "fail" })
    }
})

exports.accountSortMethod = asyncHandler(async (req, res, next) => {
    let sortMethod = "Newest First";
    
    console.log(req.params)
    //get user of account
    const accountid = req.params.accountid;
    const accountUser = await User.findOne({ _id: accountid });

    const userIsAccountHolder = await isUserAccountHolder(req.token, accountUser.username)
    console.log(userIsAccountHolder)
    // get user posts
    let userPosts = null

    try {
        sortMethod = req.body.sortMethod;
        switch (sortMethod) {
            case ("Newest First"):

                if (userIsAccountHolder) {
                    userPosts = await Post.find({ user: accountid }).populate("user").sort({ dateCreated: -1 }).exec()
                } else {
                    userPosts = await Post.find({ user: accountid, isPrivate: false }).populate("user").sort({ dateCreated: -1 }).exec()
                }

                break;
            case ("Oldest First"):
                if (userIsAccountHolder) {
                    userPosts = await Post.find({ user: accountid }).populate("user").sort({ dateCreated: 1 }).exec()
                } else {
                    userPosts = await Post.find({ user: accountid, isPrivate: false }).populate("user").sort({ dateCreated: 1 }).exec()
                }
                break;
            case ("Most Liked"):
                if (userIsAccountHolder) {
                    userPosts = await Post.aggregate([
                        {
                            "$match": {
                                "user": accountUser
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
                        { "$sort": { "numLikes": -1 } }
                    ]).exec();
                    await Post.populate(userPosts, { path: "user" });

                    // console.log(userPosts)
                    // userPosts = await Post.find({ user: accountid }).sort({ likes: -1 }).exec()
                } else {
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
                        { "$sort": { "numLikes": -1 } }
                    ]).exec();
                    await Post.populate(userPosts, { path: "user" });

                    // userPosts = await Post.find({ user: accountid, isPrivate: false }).sort({ likes: -1 }).exec()
                }
        }
        // console.log(userPosts)
        res.json(userPosts)
    } catch (e) {
        console.error(e)
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