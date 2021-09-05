module.exports = (req, res, next) => {
    if (req.session.userId) {
        global.loggedIn = true
        global.name = req.session.username
    }
    else {
        global.loggedIn = false
        global.name = ""
    }
    console.log ('Login Status: ' + global.loggedIn)
    next()
}