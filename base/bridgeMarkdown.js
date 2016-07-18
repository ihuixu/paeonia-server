var path = require('path')
var file = require('./file')
var marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})


module.exports = function(filepath){
	filepath = path.join(this.appConfig.hostPath, filepath)

	this.bridge = function(){
		return new Promise(function(resolve, reject){
			try{
				var data = file.readFile(filepath)
				var html = marked(data)
				resolve({code:0, data:html})

			}catch(err){
				resolve({code:1, err:err})

			}

		})
	}
}

