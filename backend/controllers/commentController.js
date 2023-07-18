const asyncHandler = require('express-async-handler')
const Comment = require("../models/comment")
const Post = require("../models/post")
const jwt = require("jsonwebtoken")
const util = require('util');


exports.commentSubmit = asyncHandler(async (req, res, next) => {
    // get the commenter user data.
    const currentUser = await getUser(req.token);

    //get the post via req.params
    const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();

    //get client comment data.
    // console.log(req.body)

    //create the comment.
    const comment = new Comment({
        content: req.body.comment,
        dateCreated: req.body.dateCreated,
        post: post._id,
        user: currentUser._id

    })

    // //add comment to db
    await comment.save();

});

async function getUser(token) {

    const verifyJwt = util.promisify(jwt.verify);

    try {
        const authData = await verifyJwt(token, "secretkey");
        const currentUser = authData.user;

        return currentUser;
    } catch (error) {
        return null
    }
}