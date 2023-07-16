const asyncHandler = require('express-async-handler')
const Post = require("../models/post")
const Comment = require("../models/comment")

const jwt = require("jsonwebtoken")
const util = require('util');

  /* fetch user data from databse
     user can exist or not exist.
         if posts exists
             if post private
                 is post user === user?
                     allow access WITH edit button
                 else 
                     403 
             else if post not private
                 is post user === user?
                     allow access WITH edit button
                 else
                     allow access WITHOUT edit button.
         else
             render error page


     remarks:
        - have one base function for the general page. can choose to render edit button.
          for the postUpdate route, verify that user is the author
        - the error page can be the same error page used throughout the whole site
        - the 403 error should redirect the user to the error page too
    */
exports.postPage = asyncHandler(async (req, res, next) => {
    try {
        console.log("here")
        const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();
        const allCommentsOnPost = await Comment.find({ post: req.params.postid }).exec();
        const userIsAuthor = await isUserAuthor(req.token, post.user.username);

        if (post.isPrivate) {

            if (userIsAuthor) {
                res.json({ post: post, edit: true, allCommentsOnPost: allCommentsOnPost,isVisible: true })
            } else {
                res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE" ,isVisible: false })

            }
        } else {
            if (userIsAuthor) {
                res.json({ post: post, edit: true, allCommentsOnPost: allCommentsOnPost ,isVisible: true })
            } else {
                res.json({ post: post, edit: false,allCommentsOnPost: allCommentsOnPost,isVisible: true  })
            }
        }
    } catch (e) {
        res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE" ,isVisible: false })

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
                isPrivate: true, /* change later to form data */
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