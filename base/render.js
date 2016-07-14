var ejs = require('ejs')
var path = require('path')
var file = require('./file')

module.exports = function(tplname, data){
	var config = this.config[this.config.virtualHost[this.host]]
	var viewsBase = path.join(config.hostPath, config.path.views)

	var tpl = file.readFile(path.join(viewsBase, tplname))

	this.body = ejs.render(tpl, data)
}


