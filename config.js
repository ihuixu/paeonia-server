var path = require('path')
var fs = require('fs')
var base = require ('./config/base.json')
var file = require('./base/file')

exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json'); ;

var virtualHost = require('./config/virtual_host.json')
exports.virtualHost = virtualHost

for (var i in virtualHost) {
	var hostPath = path.join(base.appPath, virtualHost[i])
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

	var paths = require(path.join(appConfigPath, 'path.json'))
	for(var j in paths){

		var dirPath = path.join(hostPath, paths[j]) 

		if(!fs.existsSync(dirPath)){
			file.mkDir(dirPath)	
		}
	}

	exports[virtualHost[i]] = appConfig
}

