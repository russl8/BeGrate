const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    post: { type: Schema.Types.ObjectId, required: true },
    dateCreated: { type: Date, required: true }
})

// //make url virtual
// GuitarSchema.virtual("url").get(function () {
//     return `catalog/guitar/${this._id}`
// })

module.exports = mongoose.model("Comment", CommentSchema)