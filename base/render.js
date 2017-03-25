var ejs = require('ejs')
var path = require('path')
var file = require('./file')

module.exports = function *(next){
  var mSelf = this
  this.render = function(tplname, data){

    var config = mSelf.appConfig
    var viewsBase = path.join(config.hostPath, config.path.views)

    mSelf.renderFn = function(){
      var viewPath = path.join(viewsBase, tplname)
      var tpl = file.readFile(viewPath)

      var options = {
        filename : viewPath
      }

      for(var i in mSelf.extFn){
        options[i] = mSelf.extFn[i]
      }

      for(var i in mSelf.appConfig.site){
        options[i] = mSelf.appConfig.site[i]
      }

      for(var i in data){
        options[i] = data[i]
      }

      options['_CSSLinks'] || (options['_CSSLinks'] = [])

      mSelf.body = ejs.render(tpl, options)
    }

	}
  console.log('register', 'render')

  yield next

  if(this.renderFn){
    this.renderFn()
    console.log('do', 'renderFn')
  }
}
