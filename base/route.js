var path = require('path')
var fs = require('fs')

module.exports = function(){	
	var config = this.config[this.config.hosts[this.host]]
	var controllerBase = path.join(config.hostPath, config.path.controller)

	var arr = this.url.split('/')
	var args = arr.pop()
	var method = 'index'
	var controllerPath = path.join(controllerBase, arr.join('/')+'.js')

	if(!fs.existsSync(controllerPath)){
		method = arr.pop()
		controllerPath = path.join(controllerBase, arr.join('/')+'.js')
	}

//	console.log(controllerPath, method, args)

	var controller = require(controllerPath)

	controller[method].call(this, args)
}


