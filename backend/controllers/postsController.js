// post-creator page
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const Post = require("../models/post")

exports.postsPage = asyncHandler(async (req, res, next) => {
    //render post page here?
})

exports.postsSubmit = asyncHandler(async (req, res, next) => {
    //verify that user is signed to submit the post.
    jwt.verify(req.token, "secretkey", asyncHandler(async (err, authData) => {
        if (err) {
            //user is not signed in. CANNOT submit post.
            res.sendStatus(403)
        } else {
            //user is signed in. can submit a post.
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                dateCreated: Date(),
                user: authData.user,
                isPrivate: req.body.isPrivate,
                likes: 0
            })
            //save post to db
            await post.save();
            // put post contents in res.json to send to client
            res.json({ postStatus: "Success", postID: post._id  })
        }
    }))
});