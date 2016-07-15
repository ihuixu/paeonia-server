var ejs = require('ejs')
var path = require('path')
var file = require('./file')

module.exports = function(tplname, data){
	var config = this.config[this.config.hosts[this.host]]
	var viewsBase = path.join(config.hostPath, config.path.views)
	var viewPath = path.join(viewsBase, tplname)

	var tpl = file.readFile(viewPath)

	this.body = ejs.render(tpl, {
		filename : viewPath 
	})
}


