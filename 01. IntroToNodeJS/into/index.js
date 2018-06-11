const storage = require('./storage.js')

storage.put('test', 10)
storage.put('first', true)
storage.put('second', true)

storage.save()

storage.clear()

storage.load()
