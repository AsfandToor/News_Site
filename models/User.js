const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please Enter The Username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please Enter The Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter The Password'],
        minlength: [5, 'Password Too Short']
    }
})

UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            console.log(`Encryption Error: ${err}`)
        }
        else {
            user.password = hash
            next()
        }
    })
})

const Users = mongoose.model('User', UserSchema)

module.exports = Users