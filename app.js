var server = require('./server')
var config = require('./config')

var configUser = {}
var configAll = {}

module.exports = {
  start : start
  , configure : configure 
}

function configure(opts = {}){
  configUser = opts
  configAll = config(configUser)

  console.log('configAll', configAll)

  return this
}


function start(opts = {}){
  if(!configUser)
    configure(opts)


  server.call(this, configAll)

  return this
}

