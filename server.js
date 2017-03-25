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

  app.use(require('./base/send'))
  app.use(require('./base/render'))
  app.use(require('./base/remoteApis'))
  app.use(require('./base/bindApis'))
  app.use(require('./base/route'))

	app.listen(config.onPort || 9001)
}
