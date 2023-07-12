// post-creator page
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const Post = require("../models/post")

exports.postsPage = asyncHandler(async (req, res, next) => {
    //render post page
})

exports.postsSubmit = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, "secretkey", asyncHandler(async (err, authData) => {
        if (err) {
            //user is not signed in. CANNOT submit post.
            res.sendStatus(403)
        } else {
            //user is signed in. can submit a post.


            //LATER: get post contents from html form
            const post = new Post({
                title: "postTitle",
                content: "second post",
                dateCreated: Date(),
                user: authData.user,
                isPrivate: false,
                likes: 0
            })

            await post.save();

            const a = await Post.find().populate("user").exec()

            // put post contents in res.json
            res.json(a)
        }
    }))
});