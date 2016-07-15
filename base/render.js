var ejs = require('ejs')
var path = require('path')
var file = require('./file')

module.exports = function(loader){
	var mSelf = this

	return function(tplname, data){
		var config = mSelf.appConfig
		var viewsBase = path.join(config.hostPath, config.path.views)
		var viewPath = path.join(viewsBase, tplname)

		var tpl = file.readFile(viewPath)

		mSelf.body = ejs.render(tpl, {
			filename : viewPath 
			, loader : loader
		})

	}
}


