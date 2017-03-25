var path = require('path')
var fs = require('fs')

module.exports = function *(next){
  yield next
  route.call(this)
}

function route(){	
	var controllerBase = path.join(this.appConfig.hostPath, this.appConfig.path.controller)

	function getPath(routePath){
		return path.join(controllerBase, (routePath || 'index')+'.js')
	}

	var url = this.url.split('?')[0]

	if(url == '/favicon.ico'){
		return;
	}

	if(url == '/'){
		url = path.join(url, this.appConfig.hostDefault || 'index')
	}

	var arr = url.split('/')
	var args = arr.pop()
	var method = 'index'
	var controllerPath = getPath(arr.join('/'))

	if(!fs.existsSync(controllerPath)){
		method = arr.pop()
		controllerPath = getPath(arr.join('/'))
	}

	try{
		var controller = require(controllerPath)
		controller[method] && controller[method].call(this, args)

	}catch(e){
		console.log(e)
	}
}


