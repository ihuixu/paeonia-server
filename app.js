var path = require('path')

var config = require('./config')
var base = require('./base/base')
var route = require('./base/route')

var koa = require('koa')
var app = koa()

app.use(function *(next){
	var start = new Date
	yield next
	var ms = new Date - start
	console.log('%s %s - %s', this.method, this.host, this.url, ms+'ms')

})

app.use(function *(next){
	this.config = config
	yield next

})


app.use(function *(next){

	for(var i in base){
		this[i] = base[i]
	}

	yield next

})

app.use(function *(next){
	route.call(this)

	var data = {}

	if(this.bridge)
		data = yield this.bridge()

	if(this.listen)
		yield this.listen(data)

})

app.listen(config.etc.onPort || 9001)
