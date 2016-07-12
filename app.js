var path = require('path')
var fs = require('fs')

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


app.use(function *(next){
	this.config = config[config.virtualHost[this.host]]

  yield next;
});


app.use(function *(next){

  this.body = this.config;

});


app.listen(config.etc.onPort || 9001);
