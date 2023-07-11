const asyncHandler = require('express-async-handler')
const Post = require("../models/post")
const Comment = require("../models/comment")

const jwt = require("jsonwebtoken")
const util = require('util');


exports.postPage = asyncHandler(async (req, res, next) => {
    //64ac36de8601dce86b93bee8 is mock post id
    //get the post from req.params.id. if DNE, render error page
    try {
        const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();
        const allCommentOnPost = await Comment.find({post: req.params.postid}).exec();
        const userIsAuthor = await isUserAuthor(req.token, post.user.username);

        if (post.isPrivate) {

            if (userIsAuthor) {
                res.json({ post: post, msg: "render page with edit button" })
            } else {
                res.sendStatus(403)
            }
        } else {
            if (userIsAuthor) {
                res.json({ post: post, msg: "render page with edit button" })
            } else {
                res.json({ post: post, msg: "render page withOUT edit button" })
            }
        }
    } catch (e) {
        res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE" })

    }
})
exports.postUpdateGet = asyncHandler(async (req, res, next) => {
    //render update form
})
exports.postUpdatePost = asyncHandler(async (req, res, next) => {
    try {
        const postToUpdate = await Post.findOne({ _id: req.params.postid }).exec();
        const updatedPost = {
            $set: {
                title: "newTitle",
                content: "newContent",
                isPrivate: true,
            }
        };
        await Post.updateOne(postToUpdate, updatedPost);
        res.json("post updated")
    } catch (e) {
        console.error("post could not be updated. please try again.")
    }
})

exports.postDeleteGet = asyncHandler(async (req, res, next) => {
    //render delete form
})
exports.postDeletePost = asyncHandler(async (req, res, next) => {
    try {
        //delete the post along with the post's comments
        const post = await Post.findOne({ _id: req.params.postid }).exec();
        await Post.deleteOne(post)
        await Comment.deleteMany({ post: req.params.postid })

        res.json("post deleted")
    } catch (e) {
        res.json(e)
    }
})

async function isUserAuthor(token, authorName) {
    const verifyJwt = util.promisify(jwt.verify);

    try {
        const authData = await verifyJwt(token, "secretkey");
        const currentUser = authData.user;

        if (authorName === currentUser.username) {
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