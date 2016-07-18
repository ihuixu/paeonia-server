var path = require('path')

var setConfig = require('./base/setConfig')
var bridge = require('./base/bridge')
var render = require('./base/render')
var route = require('./base/route')

var koa = require('koa')

module.exports = function(config, extFn){
	config = setConfig(config)

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

		yield next

	})


	app.use(function *(next){

		for(var i in bridge){
			this[i] = bridge[i]
		}

		this.render = render.call(this, extFn(this.appConfig))

		yield next

	})

	app.use(function *(next){
		route.call(this)

		var data = {}

		if(this.model)
			yield this.model()

		if(this.bridge)
			data = yield this.bridge()

		if(this.listen)
			yield this.listen(data)

	})

	app.listen(config.onPort || 9001)
}
