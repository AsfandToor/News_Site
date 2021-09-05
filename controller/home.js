const News = require('../models/News')

module.exports = async (req, res) => {
    const allNews = await News.find({})
    const sport_News = await News.find({ category: 'Sports' })
    const busi_News = await News.find({ category: 'Business' })
    const tech_News = await News.find({ category: 'Technology' })
    res.render('index', {
        allNews,
        sport_News,
        busi_News,
        tech_News
    })
}