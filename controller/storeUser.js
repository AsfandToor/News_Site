const User = require('../models/User')
const path = require('path')

module.exports = async (req, res) => {
    User.create({
        ...req.body
    }, (error, response) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            console.log(`Registeration Unsuccesful: ${validationErrors}`)
            req.flash('errors', validationErrors)
            return res.redirect('/register')
        }
        console.log(`User succesfully Created: ${response}`)
        res.redirect('/')
    })
}