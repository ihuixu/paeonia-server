var server = require('paeonia-server')
var config = require('./config.json')

var mwNames = ['loader']
var mws = {}

mwNames.map(function(v){
  mws[v] = require('./middleware/'+v)
})

server.start(config, mws)


