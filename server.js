var koa = require('koa')
var path = require('path')
var setConfig = require('./base/config')

module.exports = function(config, extFn){
	config = setConfig(config)
	!extFn && (extFn = function(){})

	var app = koa()

	app.use(function *(next){
		var start = new Date
		yield next
		var ms = new Date - start
		console.log('%s %s - %s', this.method, this.host, this.url, ms+'ms')

	})
  app.use(function *(next){
    this.config = config
    this.appConfig = config[this.host]
    this.extFn = extFn(config[this.host])

    yield next
  })

  app.use(require('./middleware/send'))
  app.use(require('./middleware/render'))
  app.use(require('./middleware/remoteApis'))
  app.use(require('./middleware/bindApis'))

  app.use(require('./middleware/route'))

	app.listen(config.onPort || 9001)
}
