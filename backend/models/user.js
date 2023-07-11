const mongoose  = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
})

// //make url virtual
// GuitarSchema.virtual("url").get(function () {
//     return `catalog/guitar/${this._id}`
// })

module.exports = mongoose.model("User", UserSchema)