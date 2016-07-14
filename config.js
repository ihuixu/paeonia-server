var path = require('path')
var fs = require('fs')
var file = require('./base/file')

var cPath = require('./config/path')

exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json')

var virtualHost = require('./config/virtual_host.json')
exports.virtualHost = virtualHost

for (var i in virtualHost) {
	var hostPath = path.join(__dirname, cPath.appPath, virtualHost[i])
	var appConfig = {}

	appConfig.hostPath = hostPath

	var appStaticPath = path.join(hostPath,  '/static/config.json')
	appConfig.static = fs.existsSync(appStaticPath) ? require(appStaticPath) : {}

	var appConfigPath = path.join(hostPath,  '/config/')

	if(!fs.existsSync(appConfigPath)){
		file.mkDir(appConfigPath)	
	}

	['site', 'path'].map(function(name){
		var filePath = path.join(appConfigPath, name + '.json')
		var config = {}

		if(!fs.existsSync(filePath)){
			config = require('./config/' + name + '.json')

			file.mkFile(filePath, JSON.stringify(config, null, 4))

		}else{
			config = require(filePath)
		}

		appConfig[name] = config

	})

	for(var j in cPath){

		var dirPath = path.join(hostPath, cPath[j]) 

		if(!fs.existsSync(dirPath)){
			file.mkDir(dirPath)	
		}
	}

	exports[virtualHost[i]] = appConfig
}

