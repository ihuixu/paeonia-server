var path = require('path')
var fs = require('fs')
var cPath = require ('./config/path.json')

exports.path = cPath;
exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json'); ;

var virtualHost = require('./config/virtual_host.json')
exports.virtualHost = virtualHost

for (var i in virtualHost) {
	var hostPath = path.join(cPath.appPath, virtualHost[i])
	var appConfig = {}
	var appStaticPath = path.join(hostPath,  '/static/config.json')
	var appConfigPath = path.join(hostPath,  '/config/')

	appConfig.hostPath = hostPath
	appConfig.static = fs.existsSync(appStaticPath) ? require(appStaticPath) : {}



	var configs = ['site', 'path']
	configs.map(function(name){
		var configPath = path.join(appConfigPath, name + '.json')
		appConfig[name] = fs.existsSync(configPath) ? require(configPath) : {}
	})


	exports[i] = appConfig
}

