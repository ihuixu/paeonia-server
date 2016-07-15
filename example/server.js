var server = require('paeonia-server')
var loader = require('cello-loader')

var config = require('./config.json')
config.dirname = __dirname

server.start(config, loader)


