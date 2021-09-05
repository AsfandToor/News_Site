// Requiring all packages
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const path = require('path')

// Init Express
const app = express()

// Connecting to Database
mongoose.connect('mongodb://127.0.0.1/news_database', { useNewUrlParser: true });

// Middlewares
const loginStatus = require('./middleware/checkLogin')
const auth = require('./middleware/authentication')
const auth_login = require('./middleware/login')

// Using Default Middlewares
app.set('view engine', 'ejs')
app.use(session({
    name: "my_session",
    secret: 'keyboard cat',
}))
app.use(flash())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(loginStatus)

// Controllers
const homeController = require('./controller/home')
const postController = require('./controller/post')
const contactController = require('./controller/contact')
const loginController = require('./controller/login')
const registerController = require('./controller/register')
const storeUserController = require('./controller/storeUser')
const loginUserController = require('./controller/loginUser')
const storePostController =  require('./controller/storePost')
const newsPageController = require('./controller/news')
const logoutController = require('./controller/logout')

// Login Global
global.loggedIn = null
global.name = ""

// Routing
app.get('/', homeController)
app.get('/post', auth, postController)
app.get('/contact', contactController)
app.get('/login', auth_login, loginController)
app.get('/register', auth_login, registerController)
app.get('/news/:id', newsPageController)
app.get('/logout', logoutController)
app.post('/store-user', storeUserController)
app.post('/login-user', loginUserController)
app.post('/store-post', storePostController)

app.listen(5000, () => {
    console.log('Listening to 5000')
})