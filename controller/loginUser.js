const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!err) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    console.log('Password Incorrect: ' + err)
                    res.redirect('/login')
                }
                console.log('Succesful: ' + result)
                req.session.username = user.username
                req.session.userId = user._id
                res.redirect('/')
            });            
        }
        console.log('No such user exists: ' + err)
    })
}