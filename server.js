var path = require('path')

var base = require('./base')
var setConfig = require('./base/config')

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

		for(var i in base){
			this[i] = base[i]
		}

		this.render = base.render.call(this, extFn(this.appConfig))
		this.send = base.send.call(this)

		yield next

	})

	app.use(function *(next){
		base.route.call(this)

		var data = {}

		if(this.model)
			yield this.model()

		if(this.bridge)
			data = yield this.bridge()

		if(this.listen)
			yield this.listen(data)

		yield next
	})

	app.listen(config.onPort || 9001)
}
