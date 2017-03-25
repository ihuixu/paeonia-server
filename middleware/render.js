var ejs = require('ejs')
var path = require('path')
var file = require('../base/file')

module.exports = function *(next){
  this.render = function(tplname, data){

    var viewsBase = path.join(this.config.hostPath, this.config.path.views)

    var viewPath = path.join(viewsBase, tplname)
    var tpl = file.readFile(viewPath)

    var options = {
      filename : viewPath
    }

    for(var i in this.config.site){
      options[i] = this.config.site[i]
    }

    for(var i in data){
      options[i] = data[i]
    }

    options['_CSSLinks'] || (options['_CSSLinks'] = [])

    console.log(tpl)
    console.log(options)

    this.body = ejs.render(tpl, options)
  }

  yield next

}
