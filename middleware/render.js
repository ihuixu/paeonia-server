var ejs = require('ejs')
var path = require('path')
var file = require('../base/file')

module.exports = function *(next){
  var mSelf = this

  this.render = function(tplname, data){

    var viewPath = path.join(this.config.path.views, tplname)
    var viewRoot = path.join(this.config.path.views, 'root')
    var str = file.readFile(viewPath)

    for(var i in this.config.site){
      data[i] = this.config.site[i]
    }

    for(var i in this.mws){
      data[i] = this[i]
    }

    data['_CSSLinks'] || (data['_CSSLinks'] = [])

    var template = ejs.compile(str, {
      filename : viewRoot
    })

    this.body = template(data)
  }

  yield next

}
