var path = require('path')
var fs = require('fs')
var file = require('./file')
var defaultConfig = require('../config.json')


module.exports = function(config){
	config = config || {}
	for(var i in defaultConfig){

		if(config[i] === undefined)
			config[i] = defaultConfig[i]

	}	

	var cPath = config.path

	for (var i in config.hosts) {
		var hostPath = path.join(config.dirname, config.appPath, config.hosts[i])
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
			var settingConfig = {}

			if(!fs.existsSync(filePath)){
				settingConfig = config.path

				file.mkFile(filePath, JSON.stringify(settingConfig, null, 4))

			}else{
				settingConfig = require(filePath)
			}

			appConfig[name] = settingConfig 

		})

		for(var j in cPath){

			var dirPath = path.join(hostPath, cPath[j]) 

			if(!fs.existsSync(dirPath)){
				file.mkDir(dirPath)	
			}
		}

		config[config.hosts[i]] = appConfig
	}

	return config
}
