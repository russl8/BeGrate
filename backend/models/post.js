const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPrivate: { type: Boolean, required: true },
    likes: { type: Number, required: true },

})

// //make url virtual
// GuitarSchema.virtual("url").get(function () {
//     return `catalog/guitar/${this._id}`
// })

module.exports = mongoose.model("Post", PostSchema)