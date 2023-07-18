const asyncHandler = require('express-async-handler')
const Post = require("../models/post")
const Comment = require("../models/comment")
const { body, validationResult } = require("express-validator");
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
        const allCommentsOnPost = await Comment.find({ post: req.params.postid })
            .populate("user") // Add population of the "user" field
            .exec();

        const loggedIn = await getUserLogInStatus(req.token)
        const userIsAuthor = await isUserAuthor(req.token, post.user.username);
        if (post.isPrivate) {
            if (userIsAuthor) {
                res.json({ post: post, edit: true, allCommentsOnPost: allCommentsOnPost, isVisible: true, loggedIn: loggedIn });
            } else {
                res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE", isVisible: false, loggedIn: loggedIn });
            }
        } else {
            if (userIsAuthor) {
                res.json({ post: post, edit: true, allCommentsOnPost: allCommentsOnPost, isVisible: true, loggedIn: loggedIn });
            } else {
                res.json({ post: post, edit: false, allCommentsOnPost: allCommentsOnPost, isVisible: true, loggedIn: loggedIn });
            }
        }
    } catch (e) {
        res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE", isVisible: false });
    }
});


exports.postUpdateGet = asyncHandler(async (req, res, next) => {
    try {
        const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();
        const userIsAuthor = await isUserAuthor(req.token, post.user.username);


        if (userIsAuthor) {
            res.json({ post: post, edit: true, })
        } else {
            res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE", edit: false })

        }

    } catch (e) {

        res.json({ msg: "PAGE DOES NOT EXIST. RENDER ERROR PAGE", isVisible: false })

    }
})
exports.postUpdatePost = [
    body("title", "Post must contain a title!").trim().isLength({ min: 1 }).escape(),
    body("content", "Post content must be more than five characters!").trim().isLength({ min: 6 }).escape(),

    asyncHandler(async (req, res, next) => {
        try {
            //errors array
            let errors = validationResult(req);

            //if there are errors, display error messages
            if (errors.errors.length === 0) {
                const postToUpdate = await Post.findOne({ _id: req.params.postid }).exec();
                const updatedPost = {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        isPrivate: req.body.isPrivate,
                    }
                };
                await Post.updateOne(postToUpdate, updatedPost);
                res.json("success")
            } else {
                res.json({ errors: errors })
            }



        } catch (e) {
            res.json("failed")
            console.error("post could not be updated. please try again.", e)
        }
    })];

exports.postDeleteGet = asyncHandler(async (req, res, next) => {
    //render delete form
})
exports.postDeletePost = asyncHandler(async (req, res, next) => {
    try {
        //delete the post along with the post's comments
        const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();
        //get post author id to pass to frontend.
        //because we need to redirect user to author page after deleting
        const postAuthor = post.user._id.toString()
        //delete the post and its comments
        await Post.deleteOne(post)
        await Comment.deleteMany({ post: req.params.postid })
        //pass data to client
        res.json({ msg: "post deleted", postAuthor: postAuthor })
    } catch (e) {
        res.json({ msg: "post could not be deleted." })
    }
})

//verifies that user is the author of the post.
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

// returns whether a user is signed in or not.
async function getUserLogInStatus(token) {

    const verifyJwt = util.promisify(jwt.verify);

    try {
        const authData = await verifyJwt(token, "secretkey");
        return true;
    } catch (error) {
        return false
    }
}