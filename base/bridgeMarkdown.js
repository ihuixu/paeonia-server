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


module.exports = function(filepath, tag){
	filepath = path.join(this.appConfig.hostPath, filepath)

	this.bridge = function(){
		return new Promise(function(resolve, reject){

			var data = {}
			var res = {}

			try{
				var md = file.readFile(filepath)
				var html = marked(md)

				res = {code:0, data:html}

			}catch(err){

				res = {code:1, err:err}

			}

			data[tag || filepath] = res

			resolve(data)
		})
	}
}

