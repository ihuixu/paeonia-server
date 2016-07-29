var server = require('paeonia-server')
server.start({
	"dirname": __dirname,
  "appPath": "./",
  "hosts": {
    "127.0.0.1:9007" : "demo"
  },
  "onPort": 9007
})
