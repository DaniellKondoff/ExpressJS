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
let load = () => {
  let dataAsString = fs.readFileSync(dataFile, 'utf8')
  data = JSON.parse(dataAsString)
}
module.exports = {
  put: put,
  get: get,
  delete: deleteItem,
  update: update,
  clear: clear,
  save: save,
  load: load
}
