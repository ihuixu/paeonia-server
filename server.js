var koa = require('koa')
var app = koa()

module.exports = function(){
  
  var config = this.config || {}
  var middleware = this.middleware || {}

	app.use(function *(next){
		var start = new Date
		yield next
		var ms = new Date - start
		console.log('%s %s - %s', this.method, this.host, this.url, ms+'ms')

	})
  app.use(function *(next){
    this.config = config[this.host]
    yield next
  })

  for(var i in middleware){
    app.use(middleware[i])
  }

  app.use(require('./middleware/send'))
  app.use(require('./middleware/render'))
  app.use(require('./middleware/remoteApis'))
  app.use(require('./middleware/bindApis'))

  app.use(require('./middleware/route'))

	app.listen(config.etc.onPort)

  return this
}

