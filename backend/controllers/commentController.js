const asyncHandler = require('express-async-handler')
const Comment = require("../models/comment")
const Post = require("../models/post")

exports.commentSubmit = asyncHandler(async (req, res, next) => {

    //set the mock comment post to postid


    //get the post via req.params.postid 64ac70c30ef609f6e3157df5
    const post = await Post.findOne({ _id: req.params.postid }).populate("user").exec();
    console.log(post)
    //make a mock comment 
    const mockComment = new Comment({
        content: "mockcomment",
        dateCreated: Date(),
        post: post._id,
        user: post.user._id

    })
    //add commnet to db
    await mockComment.save();

});     