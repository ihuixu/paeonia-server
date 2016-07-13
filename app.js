var path = require('path')
var fs = require('fs')
var Promise = require('bluebird')

var config = require('./config')
var base = require('./base/base')

var koa = require('koa')
var app = koa()

app.use(function *(next){
	var start = new Date
	yield next
	var ms = new Date - start
	console.log('%s %s - %s', this.method, this.host, this.url, ms+'ms')

})

app.use(function *(next){
	this.config = config[config.virtualHost[this.host]]
	yield next

})


app.use(function *(next){

	for(var i in base){
		this[i] = base[i]
	}

	yield next

})

app.use(function *(next){
	var arr = this.url.split('/')
	var args = arr.pop()
	var method = 'index'
	var controllerPath = path.join(this.config.hostPath, this.config.path.controller, arr.join('/')+'.js')

	if(!fs.existsSync(controllerPath)){
		method = arr.pop()
		controllerPath = path.join(this.config.hostPath, this.config.path.controller, arr.join('/')+'.js')
	}

	var controller = require(controllerPath)

	controller[method].call(this, args)

	var data = yield this.bridge()

	yield this.listen(data)

})

app.listen(config.etc.onPort || 9001)
