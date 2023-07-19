// post-creator page
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const Post = require("../models/post")
const { body, validationResult } = require("express-validator");
exports.postsPage = asyncHandler(async (req, res, next) => {
    //verify that user is signed to access the posts page.
    jwt.verify(req.token, "secretkey", asyncHandler(async (err, authData) => {
        if (err) {
            //user is not signed in. CANNOT submit post.
            res.json({ canPost: false })
        } else {
            //user is not signed in. can make post.
            res.json({ canPost: true })
        }
    }))
})

exports.postsSubmit = [
    body("title", "Post must contain a title!").trim().isLength({ min: 1 }).escape(),
    body("content", "Post content must be more than five characters!").trim().isLength({ min: 5 }).escape(),

    asyncHandler(async (req, res, next) => {

        try {
            //errors list
            let errors = validationResult(req);

            jwt.verify(req.token, "secretkey", asyncHandler(async (err, authData) => {
                if (err) {
                    //user is not signed in. CANNOT submit post.
                    res.sendStatus(403)
                } else {
                    //user is signed in. can submit a post. check for errors first.


                    if (errors.errors.length === 0) {
                        const post = new Post({
                            title: req.body.title,
                            content: req.body.content,
                            dateCreated: Date(),
                            user: authData.user,
                            isPrivate: req.body.isPrivate,
                            likes: []
                        })
                        //save post to db
                        await post.save();
                        // put post contents in res.json to send to client
                        res.json({ postStatus: "Success", postID: post._id })
                    } else {
                        res.json({ postStatus: "Failed",errors: errors});
                    }



                }
            }))
        } catch (err) { console.error(err) }
        //verify that user is signed to submit the post.

    })]