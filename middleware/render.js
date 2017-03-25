var ejs = require('ejs')
var path = require('path')
var file = require('../base/file')

module.exports = function *(next){
  this.render = function(tplname, data){

    var config = this.appConfig
    var viewsBase = path.join(config.hostPath, config.path.views)

    var viewPath = path.join(viewsBase, tplname)
    var tpl = file.readFile(viewPath)

    var options = {
      filename : viewPath
    }

    for(var i in this.extFn){
      options[i] = this.extFn[i]
    }

    for(var i in this.appConfig.site){
      options[i] = this.appConfig.site[i]
    }

    for(var i in data){
      options[i] = data[i]
    }

    options['_CSSLinks'] || (options['_CSSLinks'] = [])

    this.body = ejs.render(tpl, options)
  }

  yield next

}
