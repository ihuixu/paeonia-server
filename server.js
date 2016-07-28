var path = require('path')

var setConfig = require('./lib/config')
var base = require('./lib/base')
var model = require('./lib/model')
var listen = require('./lib/listen')

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

		for(var i in model){
			this[i] = model[i]
		}

		for(var i in listen){
			this[i] = listen[i]
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
