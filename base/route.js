var path = require('path')
var fs = require('fs')

module.exports = function(){	
	var controllerBase = path.join(this.config.hostPath, this.config.path.controller)

	var arr = this.url.split('/')
	var args = arr.pop()
	var method = 'index'
	var controllerPath = path.join(controllerBase, arr.join('/')+'.js')

	if(!fs.existsSync(controllerPath)){
		method = arr.pop()
		controllerPath = path.join(controllerBase, arr.join('/')+'.js')
	}

	var controller = require(controllerPath)

	controller[method].call(this, args)
}


