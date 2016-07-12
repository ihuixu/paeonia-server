var path = require('path')
var fs = require('fs')
var base = require ('./config/base.json')
var file = require('./base/file')

exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json'); ;

var virtualHost = require('./config/virtual_host.json')
exports.virtualHost = virtualHost

for (var i in virtualHost) {
	var appPath = path.join(base.appPath, virtualHost[i])
	var appConfig = {}

	appConfig.appPath = appPath

	var appStaticPath = path.join(appPath,  '/static/config.json')
	appConfig.static = fs.existsSync(appStaticPath) ? require(appStaticPath) : {}

	var appConfigPath = path.join(appPath,  '/config/')

	if(!fs.existsSync(appConfigPath)){
		file.mkDir(appConfigPath)	
	}

	['site', 'path'].map(function(name){
		var configPath = path.join(appConfigPath, name + '.json')
		var config = {}

		if(!fs.existsSync(configPath)){
			config = require('./config/' + name + '.json')

			file.mkFile(configPath, JSON.stringify(config, null, 4))

		}else{
			config = require(configPath)
		}

		appConfig[name] = config

	})

	var paths = require(path.join(appConfigPath, 'path.json'))
	for(var i in paths){

		var dirPath = path.join(appPath, paths[i]) 

		if(!fs.existsSync(dirPath)){
			file.mkDir(dirPath)	
		}
	}

	exports[virtualHost[i]] = appConfig
}

