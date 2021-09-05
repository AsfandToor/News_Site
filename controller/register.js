module.exports = (req, res) => {
    console.log('Register Errors: ' + req.flash('errors'))
    res.render('register', {
        errors: req.flash('errors')
    })
}