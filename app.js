var path = require('path')
var config = require('./config')

var koa = require('koa');
var app = koa();

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.host, this.url, ms+'ms');
});

// response

app.use(function *(next){
	
	this.hostPath = path.join(config.path.appPath, config.virtualHost[this.host])
  yield next;

});



app.use(function *(next){

  this.body = 'Hello World' + this.hostPath;

});


app.listen(config.etc.onPort || 9001);
