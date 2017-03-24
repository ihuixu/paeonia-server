var path = require('path')

var setConfig = require('./base/config')

var route = require('./base/route')

var koa = require('koa')

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

/*
  app.use(require('./base/bridgeMuch'))
  app.use(require('./base/bridgeMarkdown'))

  app.use(require('./base/listen'))
  app.use(require('./base/model'))
for(var i in listen){
	exports[i] = listen[i]
}

for(var i in model){
	exports[i] = model[i]
}


  */


  app.use(require('./base/send'))
  app.use(require('./base/render'))

	app.use(function *(next){
		route.call(this)
		yield next
	})


	app.use(function *(next){
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
