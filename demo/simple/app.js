var server = require('paeonia-server')
server.start({
  "appPath": "./",
  "hosts": {
    "127.0.0.1:9007" : "demo"
  },
  "onPort": 9007
})
