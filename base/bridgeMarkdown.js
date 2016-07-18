var path = require('path')
var file = require('./file')
var markdown = require( "markdown" ).markdown

module.exports = function(filepath){
	filepath = path.join(this.appConfig.hostPath, filepath)

	this.bridge = function(){
		return new Promise(function(resolve, reject){
			try{
				var data = file.readFile(filepath)
				var html = markdown.toHTML(data)
				resolve({code:0, data:html})

			}catch(err){
				resolve({code:1, err:err})

			}

		})
	}
}

