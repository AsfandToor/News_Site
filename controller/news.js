const News = require('../models/News')
module.exports = async (req, res) => {
    const news = await News.findById(req.params.id)
    res.render('news', {
        news
    })
}