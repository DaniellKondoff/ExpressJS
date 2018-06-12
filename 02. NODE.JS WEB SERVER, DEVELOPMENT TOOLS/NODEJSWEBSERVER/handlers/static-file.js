const fs = require('fs')
module.exports = (req, res) => {
  fs.readFile('.' + req.path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('404 Not Found - Check your URL')
      res.end()
      return
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}
