const fs = require('fs')

const dataFile = 'storage.dat'
let data = {}

let validateKeyAsString = (key) => {
  if (typeof key !== 'string') {
    throw new Error('The key myst be a string')
  }
}
let validateKeyExists = (key) => {
  if (!data.hasOwnProperty(key)) {
    throw new Error('The key does not exist')
  }
}

let put = (key, value) => {
  validateKeyAsString(key)
  if (data.hasOwnProperty(key)) {
    throw new Error('The key already exist')
  }
  data[key] = value
}

let get = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  return data[key]
}
let deleteItem = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  delete data[key]
}
let update = (key, value) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  data[key] = value
}
let clear = () => {
  data = {}
}
let save = () => {
  let dataAsString = JSON.stringify(data)
  fs.writeFileSync(dataFile, dataAsString)
}

let saveAsync = (callback) => {
  let dataAsString = JSON.stringify(data)
  fs.writeFile(dataFile, dataAsString, (err) => {
    if (err) {
      console.log(err)
      return
    }

    callback()
  })
}

let saveAsPromis = () => {
  return new Promise((resolve, reject) => {
    let dataAsString = JSON.stringify(data)
    fs.watchFile(dataFile, dataAsString, err => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

let load = () => {
  let dataAsString = fs.readFileSync(dataFile, 'utf8')
  data = JSON.parse(dataAsString)
}

let loadAsync = (callback) => {
  fs.readFile(dataFile, 'utf8', (err, dataJson) => {
    if (err) {
      console.log(err)
    }

    data = JSON.parse(dataJson)
    callback()
  })
}

let loadAsPromis = () => {

  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, dataJson) => {
      if (err) {
        reject(err)
        return
      }

      data = JSON.parse(dataJson)
      resolve()
    })
  })
}


module.exports = {
  put: put,
  get: get,
  delete: deleteItem,
  update: update,
  clear: clear,
  save: save,
  load: load,
  saveAsync: saveAsync,
  loadAsync: loadAsync,
  loadAsPromis: loadAsPromis,
  saveAsPromis: saveAsPromis
}
