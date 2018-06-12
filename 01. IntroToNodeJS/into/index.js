const storage = require('./storage.js')

storage.put('test', 10)
storage.put('first', true)
storage.put('second', true)

storage.save()

storage.clear()

storage.load()

storage.saveAsync(() => {
  storage.clear()

  storage.loadAsync(() => {
    let afterLoadValue = storage.get('test')
    console.log(afterLoadValue)
  })
})

storage
  .saveAsPromis()
  .then(() => {
    storage.clear()

    storage
      .loadAsPromis()
      .then(() => {
        let afterLoadValue = storage.get('test')
        console.log(afterLoadValue)
      })
  })
