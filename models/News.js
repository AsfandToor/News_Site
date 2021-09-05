const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter the title']
    },
    category: {
        type: String,
        required: [true, 'Please enter the category']
    },
    image: {
        type: String,
        required: [true, 'Please uplaod image']
    },
    post: {
        type: String,
        required: [true, 'Please enter the post'],
        minlength: [500, 'Post too short'] 
    },
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const News = mongoose.model("News", NewsSchema)

module.exports = News