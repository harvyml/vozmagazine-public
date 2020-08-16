const mongoose = require("mongoose")
var Schema = mongoose.Schema

const post = new Schema({
    _id: Schema.Types.ObjectId,//mongoose.Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    author: String,
    title: String,
    hasvideo: Boolean,
    media: String,
    markdown: String,
    description: String,
    datems: Number,
    tags: String,
    city: String,
    claps: Number,
    category: String,
    likes: {type: Array, required: false},
    comments: [{
        name: {type: String, required: false},
        userId: {type: Schema.Types.ObjectId, required: false},
        markdown: {type: String, required: false},
        date: {type: Number, required: false}
    }]
}, {collection: "posts"})

module.exports = mongoose.model('Post', post)