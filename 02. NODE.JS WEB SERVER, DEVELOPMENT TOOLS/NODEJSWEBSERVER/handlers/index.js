const homePageHandler = require('./home-page')
const favIconPageHandler = require('./favicon')
const staticFileHandler = require('./static-file')

module.exports = [
  homePageHandler,
  favIconPageHandler,
  staticFileHandler
]
