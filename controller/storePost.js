const News = require('../models/News')
const path = require('path')
const multer = require('multer'); 

// Set File Storage Engine
const storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null, 'public/uploads/');
      },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Init Upload
const upload = multer({ storage: storage }).single('image');

module.exports = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('Image Uploadation Error: ' + err)
            return res.redirect('/post')
        }
        const filename = req.file.filename
        News.create({
            ...req.body,
            image: filename,
            username: req.session.username
        }, (err, post) => {
            if (err) {
                console.log('Post not created: ' + err)
                return res.redirect('/post')
            }
            console.log('Post Succsecfully Created: ' + post)
            return res.redirect('/')
        })
    })
}