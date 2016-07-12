var path = require('path')
var fs = require('fs')
var cPath = require ('./config/path.json')

exports.path = cPath;
exports.etc = require ('./config/etc.json') 
exports.api = require ('./config/api.json'); ;

var virtualHost = require('./config/virtual_host.json')
for (var i in virtualHost) {
	var hostPath = virtualHost[i]
	var appConfig = {}

	var staticConfigPath = path.resolve(cPath.appPath + hostPath + '/static/config.json')
	var siteConfigPath = path.resolve(cPath.appPath + hostPath + '/config/site.json')

	appConfig.static = fs.existsSync(staticConfigPath) ? require(staticConfigPath) : {}
	appConfig.site = fs.existsSync(siteConfigPath) ? require(siteConfigPath) : {}

	console.log('load ' + hostPath + ' app config success...')

	var tplPre = hostPath.replace(/\//g, '')
	exports[tplPre] = appConfig
}

exports.virtualHost = virtualHost
