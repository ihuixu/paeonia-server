var path = require('path')
var fs = require('fs')

module.exports = function(){	
	var controllerBase = path.join(this.appConfig.hostPath, this.appConfig.path.controller)

	var url = this.url == '/'	
						? this.appConfig.hostDefault
						: this.url

	var arr = url.split('/')
	var args = arr.pop()
	var method = 'index'
	var controllerPath = path.join(controllerBase, arr.join('/')+'.js')

	if(!fs.existsSync(controllerPath)){
		method = arr.pop()

		controllerPath = path.join(controllerBase, arr.join('/') + '.js')
	}

//	console.log(controllerPath, method, args)

	var controller = require(controllerPath)

	controller[method].call(this, args)
}


