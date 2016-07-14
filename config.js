var path = require('path')
var fs = require('fs')
var file = require('./base/file')

var config = require('./config.json')
for(var i in config){
	exports[i] = config[i]
}

var cPath = config.path

for (var i in config.hosts) {
	var hostPath = path.join(__dirname, config.appPath, config.hosts[i])
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

	exports[config.hosts[i]] = appConfig
}

